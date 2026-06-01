import { describe, it, expect } from "vitest";
import { checkSchemaCompat, SUPPORTED_SCHEMA_VERSION } from "../schemaCompat";

describe("checkSchemaCompat", () => {
  it("accepts a version inside the supported range", () => {
    const r = checkSchemaCompat(SUPPORTED_SCHEMA_VERSION.min);
    expect(r.mode).toBe("ok");
    expect(r.message).toBeNull();
  });

  it("treats a missing version as best-effort (predates versioning)", () => {
    const r = checkSchemaCompat(undefined);
    expect(r.mode).toBe("best-effort");
    expect(r.message).toMatch(/predates schema versioning/i);
  });

  it("treats schemaVersion 0 as best-effort", () => {
    expect(checkSchemaCompat(0).mode).toBe("best-effort");
  });

  it("rejects a version above the supported range with an explicit message", () => {
    const tooNew = SUPPORTED_SCHEMA_VERSION.max + 1;
    const r = checkSchemaCompat(tooNew);
    expect(r.mode).toBe("unsupported");
    expect(r.message).toContain(String(tooNew));
    expect(r.message).toContain(String(SUPPORTED_SCHEMA_VERSION.max));
  });

  it("uses an injectable range for testing future windows", () => {
    expect(checkSchemaCompat(2, { min: 1, max: 3 }).mode).toBe("ok");
    expect(checkSchemaCompat(4, { min: 1, max: 3 }).mode).toBe("unsupported");
  });
});
