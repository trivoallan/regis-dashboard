import { Command } from "commander";
import { execFileSync } from "node:child_process";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  cpSync,
  existsSync,
  copyFileSync,
} from "node:fs";
import { resolve, join, dirname } from "node:path";

// Repo root, resolved at runtime from the compiled command module location.
function repoRoot(): string {
  // dist/cli/commands/render.js -> commands -> cli -> dist -> repo root
  return resolve(__dirname, "..", "..", "..");
}

function parseArchives(entries: string[]): { name: string; path: string }[] {
  return entries.map((e) => {
    const idx = e.indexOf(":");
    if (idx < 0)
      throw new Error(`Invalid archive ${e}. Expected "Name:path-or-url".`);
    return { name: e.slice(0, idx), path: e.slice(idx + 1) };
  });
}

export function registerRender(program: Command): void {
  program
    .command("render <report>")
    .description("Build a static report site from a report.json")
    .requiredOption(
      "-o, --output <dir>",
      "Directory to write the static site into",
    )
    .option("--base-url <url>", "Base URL for the site (e.g. /reports/)", "/")
    .option(
      "-a, --archive <entry...>",
      'Named archive "Name:path-or-url" (repeatable)',
    )
    .action(
      (
        report: string,
        opts: { output: string; baseUrl: string; archive?: string[] },
      ) => {
        const root = repoRoot();
        const staticDir = join(root, "static");
        mkdirSync(staticDir, { recursive: true });

        // 1. stage report.json
        const reportData = readFileSync(resolve(report), "utf8");
        writeFileSync(join(staticDir, "report.json"), reportData, "utf8");

        // 2. stage archives.json if provided
        if (opts.archive?.length) {
          const archives = parseArchives(opts.archive);
          writeFileSync(
            join(staticDir, "archives.json"),
            JSON.stringify({ archives }, null, 2),
            "utf8",
          );
        }

        // 3. run the project's own docusaurus build with REPORT_BASE_URL set
        const baseUrl = opts.baseUrl.endsWith("/")
          ? opts.baseUrl
          : opts.baseUrl + "/";
        execFileSync("pnpm", ["run", "build"], {
          cwd: root,
          env: {
            ...process.env,
            REPORT_BASE_URL: baseUrl,
            NODE_ENV: "production",
          },
          stdio: "inherit",
        });

        // 4. copy build/ to the output dir, ensuring report.json at the root
        const outDir = resolve(opts.output);
        mkdirSync(outDir, { recursive: true });
        cpSync(join(root, "build"), outDir, { recursive: true });
        const outReport = join(outDir, "report.json");
        if (!existsSync(outReport)) {
          mkdirSync(dirname(outReport), { recursive: true });
          copyFileSync(join(staticDir, "report.json"), outReport);
        }
        process.stderr.write(`Report site written to ${outDir}\n`);
      },
    );
}
