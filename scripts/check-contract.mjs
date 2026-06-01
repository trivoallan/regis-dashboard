// Fetches the core's report.v1 fixture and asserts this dashboard supports its schemaVersion.
import { readFileSync } from "node:fs";

const fixtureUrl =
  process.env.CORE_FIXTURE_URL ??
  "https://raw.githubusercontent.com/trivoallan/regis/main/tests/fixtures/report.v1.json";

// Read the dashboard's supported range straight from source (single source of truth).
// (Do not shadow the global URL constructor — it is needed for the import.meta.url resolve.)
const srcPath = new URL("../src/lib/schemaCompat.ts", import.meta.url);
const src = readFileSync(srcPath, "utf8");
const min = Number(/min:\s*(\d+)/.exec(src)?.[1]);
const max = Number(/max:\s*(\d+)/.exec(src)?.[1]);

const res = await fetch(fixtureUrl);
if (!res.ok) {
  console.error(
    `Failed to fetch core fixture: ${res.status} ${res.statusText}`,
  );
  process.exit(2);
}
const report = await res.json();
const v = report.schemaVersion ?? 0;

if (v < min || v > max) {
  console.error(
    `DRIFT: core report.v1 schemaVersion=${v} is outside this dashboard's supported range ${min}-${max}. ` +
      `Bump SUPPORTED_SCHEMA_VERSION.max in src/lib/schemaCompat.ts and add render support.`,
  );
  process.exit(1);
}
console.log(
  `OK: core schemaVersion ${v} is within supported range ${min}-${max}.`,
);
