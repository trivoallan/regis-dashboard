import { describe, it, expect, beforeEach } from "vitest";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { addToArchive } from "../lib/archiveStore";

function report(tag: string, ts: string) {
  return {
    request: {
      registry: "r",
      repository: "repo",
      tag,
      digest: "sha256:x",
      timestamp: ts,
    },
    rules_summary: { score: 90, passed: [], total: [] },
    rules: [],
  };
}

describe("addToArchive", () => {
  let dir: string;
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "arch-"));
  });

  it("writes report.json under registry/repo/tag/timestampZ and a manifest", () => {
    const p = addToArchive(report("1.0", "2026-05-31T10:00:00+00:00"), dir);
    expect(p).toContain(join("r", "repo", "1.0"));
    expect(p.endsWith("report.json")).toBe(true);
    expect(existsSync(p)).toBe(true);

    const manifest = JSON.parse(
      readFileSync(join(dir, "manifest.json"), "utf8"),
    );
    expect(manifest).toHaveLength(1);
    expect(manifest[0].tag).toBe("1.0");
    expect(manifest[0].path).toMatch(/^r\/repo\/1\.0\/.*\/report\.json$/);

    // data.json mirrors manifest.json
    const data = JSON.parse(readFileSync(join(dir, "data.json"), "utf8"));
    expect(data).toEqual(manifest);
  });

  it("replaces an entry with the same id and sorts by timestamp desc", () => {
    addToArchive(report("1.0", "2026-05-30T10:00:00+00:00"), dir);
    addToArchive(report("2.0", "2026-05-31T10:00:00+00:00"), dir);
    // re-add 1.0 with same timestamp → same id → replaced, not duplicated
    addToArchive(report("1.0", "2026-05-30T10:00:00+00:00"), dir);

    const manifest = JSON.parse(
      readFileSync(join(dir, "manifest.json"), "utf8"),
    );
    expect(manifest).toHaveLength(2);
    expect(manifest[0].tag).toBe("2.0"); // newest first
    expect(manifest[1].tag).toBe("1.0");
  });
});
