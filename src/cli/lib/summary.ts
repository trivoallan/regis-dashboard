import { tsSafe } from "./paths";

type Report = Record<string, any>;

const LEVEL_RANK: Record<string, number> = { critical: 1, warning: 2, info: 3 };
const RANK_LEVEL: Record<number, string> = {
  1: "critical",
  2: "warning",
  3: "info",
};

/** Port of _calculate_status: highest-severity failing rule level, else "pass". */
export function calculateStatus(report: Report): string {
  const rules: Report[] = report.rules ?? [];
  if (rules.length === 0 && !report.rules_summary) return "pass";
  let maxRank = 99;
  for (const r of rules) {
    if (!r.passed) {
      const lvl = String(r.level ?? "info").toLowerCase();
      const rank = LEVEL_RANK[lvl] ?? 3;
      if (rank < maxRank) maxRank = rank;
    }
  }
  return RANK_LEVEL[maxRank] ?? "pass";
}

/** Port of _make_summary: flat manifest row from a full report. */
export function makeSummary(report: Report, path: string): Report {
  const req: Report = report.request ?? {};
  const registry = req.registry ?? "unknown";
  const repository = req.repository ?? "unknown";
  const tag = req.tag ?? "unknown";
  const timestamp = req.timestamp ?? new Date().toISOString();
  const id = `${registry}/${repository}/${tag}/${tsSafe(timestamp)}`;

  const rs: Report = report.rules_summary ?? {};
  const passedRaw = rs.passed ?? 0;
  const totalRaw = rs.total ?? 0;
  const rulesPassed = Array.isArray(passedRaw)
    ? passedRaw.length
    : Number(passedRaw || 0);
  const rulesTotal = Array.isArray(totalRaw)
    ? totalRaw.length
    : Number(totalRaw || 0);
  const score = Number(rs.score ?? 0) | 0;

  const pb = report.playbook ?? (report.playbooks ?? [{}])[0];
  const tier =
    report.tier ?? (pb && typeof pb === "object" ? pb.tier : null) ?? null;

  const results: Report = report.results ?? {};
  const cve: Report = results.cve ?? {};
  const freshness: Report = results.freshness ?? {};
  const sbom: Report = results.sbom ?? {};
  const scorecard: Report = results.scorecarddev ?? {};

  return {
    id,
    timestamp,
    registry,
    repository,
    tag,
    digest: req.digest ?? null,
    score,
    tier,
    rules_passed: rulesPassed,
    rules_total: rulesTotal,
    cve_critical: cve.critical_count ?? null,
    cve_high: cve.high_count ?? null,
    cve_medium: cve.medium_count ?? null,
    cve_low: cve.low_count ?? null,
    age_days: freshness.age_days ?? null,
    sbom_component_count: sbom.component_count ?? null,
    scorecard_score: scorecard.score ?? null,
    status: calculateStatus(report),
    path,
  };
}
