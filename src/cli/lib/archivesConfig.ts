import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

export interface ArchiveEntry {
  name: string;
  path: string;
}

export function loadArchives(file: string): ArchiveEntry[] {
  if (!existsSync(file)) return [];
  try {
    const data = JSON.parse(readFileSync(file, "utf8"));
    return Array.isArray(data?.archives) ? data.archives : [];
  } catch {
    return [];
  }
}

export function addArchive(
  archives: ArchiveEntry[],
  name: string,
  path: string,
): ArchiveEntry[] {
  if (!name.trim() || !path.trim())
    throw new Error("Name and path must not be empty.");
  if (archives.some((a) => a.name === name)) {
    throw new Error(
      `Archive '${name}' already exists. Remove it first with --remove.`,
    );
  }
  return [...archives, { name, path }];
}

export function removeArchive(
  archives: ArchiveEntry[],
  name: string,
): ArchiveEntry[] {
  const next = archives.filter((a) => a.name !== name);
  if (next.length === archives.length)
    throw new Error(`Archive '${name}' not found.`);
  return next;
}

export function writeArchives(file: string, archives: ArchiveEntry[]): void {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ archives }, null, 2) + "\n", "utf8");
}
