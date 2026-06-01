import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { checkSchemaCompat } from "../schemaCompat";

describe("contract: committed demo report", () => {
  it("static/report.json is renderable by this dashboard (mode 'ok')", () => {
    const report = JSON.parse(
      readFileSync(resolve(__dirname, "../../../static/report.json"), "utf8"),
    );
    expect(typeof report.schemaVersion).toBe("number");
    const compat = checkSchemaCompat(report.schemaVersion);
    expect(compat.mode).toBe("ok");
  });
});
