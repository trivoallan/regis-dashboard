/** The schemaVersion range this dashboard release can render.
 *  Bump `max` when the dashboard adds support for a new report schemaVersion. */
export const SUPPORTED_SCHEMA_VERSION = { min: 1, max: 1 } as const;

export interface SchemaRange {
  min: number;
  max: number;
}

export interface CompatResult {
  mode: "ok" | "best-effort" | "unsupported";
  /** Non-null for best-effort (warning) and unsupported (error); null for ok. */
  message: string | null;
}

/** Decide whether this dashboard can render a report of the given schemaVersion.
 *  - undefined / 0  → best-effort (report predates schema versioning)
 *  - within [min,max] → ok
 *  - otherwise      → unsupported (explicit, actionable message) */
export function checkSchemaCompat(
  schemaVersion: number | undefined,
  range: SchemaRange = SUPPORTED_SCHEMA_VERSION,
): CompatResult {
  const v = schemaVersion ?? 0;
  if (v === 0) {
    return {
      mode: "best-effort",
      message:
        "This report predates schema versioning (no schemaVersion field); rendering is best-effort.",
    };
  }
  if (v < range.min || v > range.max) {
    return {
      mode: "unsupported",
      message:
        `This report uses schemaVersion ${v}; this dashboard supports ${range.min}–${range.max}. ` +
        `Use a newer regis-dashboard image, or regenerate the report with a compatible regis version.`,
    };
  }
  return { mode: "ok", message: null };
}
