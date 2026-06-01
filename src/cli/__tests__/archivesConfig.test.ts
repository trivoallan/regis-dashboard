import { describe, it, expect, beforeEach } from "vitest";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  loadArchives,
  addArchive,
  removeArchive,
  writeArchives,
} from "../lib/archivesConfig";

describe("archivesConfig", () => {
  let file: string;
  beforeEach(() => {
    file = join(mkdtempSync(join(tmpdir(), "cfg-")), "archives.json");
  });

  it("adds an entry and round-trips the {archives:[...]} shape", () => {
    const next = addArchive(
      loadArchives(file),
      "Prod",
      "https://x/manifest.json",
    );
    writeArchives(file, next);
    const parsed = JSON.parse(readFileSync(file, "utf8"));
    expect(parsed).toEqual({
      archives: [{ name: "Prod", path: "https://x/manifest.json" }],
    });
  });

  it("rejects a duplicate name", () => {
    const one = addArchive([], "Prod", "a");
    expect(() => addArchive(one, "Prod", "b")).toThrow(/already exists/);
  });

  it("removes by name and errors when absent", () => {
    const one = addArchive([], "Prod", "a");
    expect(removeArchive(one, "Prod")).toEqual([]);
    expect(() => removeArchive([], "Nope")).toThrow(/not found/);
  });
});
