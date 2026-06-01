import { describe, it, expect } from "vitest";
import { makeSummary, calculateStatus } from "../lib/summary";

const baseReport = {
  request: {
    registry: "registry-1.docker.io",
    repository: "library/nginx",
    tag: "1.27",
    digest: "sha256:abc",
    timestamp: "2026-05-31T12:00:00+00:00",
  },
  rules_summary: { score: 100, passed: ["a"], total: ["a"] },
  results: {
    cve: { critical_count: 0, high_count: 1, medium_count: 4, low_count: 12 },
  },
  rules: [{ slug: "a", passed: true, level: "Gold" }],
};

describe("makeSummary", () => {
  it("flattens a report into the manifest summary row", () => {
    const s = makeSummary(
      baseReport,
      "registry-1.docker.io/library/nginx/1.27/x/report.json",
    );
    // ts_safe mirrors the Python port exactly:
    // "2026-05-31T12:00:00+00:00" -> replace ":"->"-", "+"->"", split "."[0]
    // -> "2026-05-31T12-00-0000-00"
    expect(s.id).toBe(
      "registry-1.docker.io/library/nginx/1.27/2026-05-31T12-00-0000-00",
    );
    expect(s.registry).toBe("registry-1.docker.io");
    expect(s.repository).toBe("library/nginx");
    expect(s.tag).toBe("1.27");
    expect(s.score).toBe(100);
    expect(s.rules_passed).toBe(1);
    expect(s.rules_total).toBe(1);
    expect(s.cve_critical).toBe(0);
    expect(s.cve_high).toBe(1);
    expect(s.path).toBe(
      "registry-1.docker.io/library/nginx/1.27/x/report.json",
    );
    expect(s.status).toBe("pass");
  });

  it("derives status from the highest-severity failing rule", () => {
    expect(
      calculateStatus({ rules: [{ passed: false, level: "warning" }] }),
    ).toBe("warning");
    expect(
      calculateStatus({
        rules: [
          { passed: false, level: "critical" },
          { passed: false, level: "info" },
        ],
      }),
    ).toBe("critical");
    expect(
      calculateStatus({ rules: [{ passed: true, level: "critical" }] }),
    ).toBe("pass");
    expect(calculateStatus({})).toBe("pass");
  });
});
