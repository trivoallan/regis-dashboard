/** Replace characters unsafe for directory names (port of _safe_segment). */
export function safeSegment(value: string): string {
  return value.replace(/\//g, "_").replace(/\\/g, "_").replace(/:/g, "_");
}

/** Normalise an ISO timestamp to a filesystem-safe id fragment.
 *  "2026-05-31T12:00:00+00:00" -> "2026-05-31T12-00-0000-00"  (no suffix)
 *  Pass suffix "Z" to mirror the archive directory naming.
 *
 *  Mirrors the Python port exactly: replace ":"->"-", "+"->"", then split "."[0].
 *  (Splitting on "." is independent of the ":"/"+" replacements, so doing it
 *  last matches the Python order for every input.) */
export function tsSafe(timestamp: string, suffix = ""): string {
  const noFrac = timestamp.split(".")[0];
  return noFrac.replace(/:/g, "-").replace(/\+/g, "") + suffix;
}
