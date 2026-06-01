import { describe, it, expect, beforeEach } from "vitest";
import { mkdtempSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scaffoldArchive } from "../commands/bootstrapArchive";

describe("scaffoldArchive", () => {
  let dir: string;
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "boot-"));
  });

  it("github platform keeps .github and drops .gitlab-ci.yml", () => {
    scaffoldArchive(dir, "github");
    expect(existsSync(join(dir, ".github/workflows/analyze.yml"))).toBe(true);
    expect(existsSync(join(dir, ".github/workflows/preview.yml"))).toBe(true);
    expect(existsSync(join(dir, ".gitlab-ci.yml"))).toBe(false);
    expect(existsSync(join(dir, ".regis-post-install.md"))).toBe(true);
  });

  it("gitlab platform keeps .gitlab-ci.yml and drops .github", () => {
    scaffoldArchive(dir, "gitlab");
    expect(existsSync(join(dir, ".gitlab-ci.yml"))).toBe(true);
    expect(existsSync(join(dir, ".github"))).toBe(false);
  });
});
