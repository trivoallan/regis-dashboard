import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, relative, sep, posix } from "node:path";
import { makeSummary } from "./summary";
import { safeSegment, tsSafe } from "./paths";

type Report = Record<string, any>;

function loadJsonArray(path: string): Report[] {
  if (!existsSync(path)) return [];
  try {
    const data = JSON.parse(readFileSync(path, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Port of add_to_archive. Returns the absolute path to the written report.json. */
export function addToArchive(
  report: Report,
  archiveDir: string,
  pretty = true,
): string {
  mkdirSync(archiveDir, { recursive: true });
  const req: Report = report.request ?? {};
  const registry = safeSegment(req.registry ?? "unknown");
  const repository = safeSegment(req.repository ?? "unknown");
  const tag = safeSegment(req.tag ?? "unknown");
  const timestamp = req.timestamp ?? new Date().toISOString();
  const tsDir = tsSafe(timestamp, "Z");

  const reportDir = join(archiveDir, registry, repository, tag, tsDir);
  mkdirSync(reportDir, { recursive: true });
  const reportPath = join(reportDir, "report.json");

  const indent = pretty ? 2 : undefined;
  writeFileSync(reportPath, JSON.stringify(report, null, indent), "utf8");

  // relative posix path for the manifest
  const relativePath = relative(archiveDir, reportPath)
    .split(sep)
    .join(posix.sep);
  const summary = makeSummary(report, relativePath);

  const manifestPath = join(archiveDir, "manifest.json");
  let manifest = loadJsonArray(manifestPath).filter((e) => e.id !== summary.id);
  manifest.push(summary);
  manifest.sort((a, b) =>
    String(b.timestamp ?? "").localeCompare(String(a.timestamp ?? "")),
  );

  writeFileSync(manifestPath, JSON.stringify(manifest, null, indent), "utf8");
  writeFileSync(
    join(archiveDir, "data.json"),
    JSON.stringify(manifest, null, indent),
    "utf8",
  );

  return reportPath;
}
