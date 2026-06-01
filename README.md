# regis-dashboard

Standalone interactive viewer for [regis](https://github.com/trivoallan/regis)
container-security reports.

Live demo: https://trivoallan.github.io/regis-dashboard/

## What it does

Renders a regis `report.json` as an interactive Docusaurus + Tremor site:
summary, rules, per-analyzer pages, and a multi-report archive browser.

## Contract

This viewer consumes the regis report envelope identified by an integer
`schemaVersion`. The supported range is declared per release (see the runtime
compatibility check — added in a later phase). The reference report shape lives
at `trivoallan/regis:tests/fixtures/report.v1.json`.

## Develop

    corepack enable
    pnpm install
    pnpm start          # dev server with the demo report (static/report.json)
    pnpm build          # static build into build/

## Status

Extracted from the regis monorepo (`apps/dashboard`). The CLI (`render` / `serve`
/ `archive` / `bootstrap archive`) and the published Docker image are added in
Phase 1b.
