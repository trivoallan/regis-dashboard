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

Extracted from the regis monorepo (`apps/dashboard`).

## Use the CLI

    # render a static site from a report
    docker run --rm -v "$PWD:/data" ghcr.io/trivoallan/regis-dashboard render /data/report.json -o /data/site

    # live preview
    docker run --rm -p 8000:8000 -v "$PWD:/data" ghcr.io/trivoallan/regis-dashboard serve /data/report.json

    # manage a multi-report archive
    regis-dashboard archive add report.json -A ./archive
    regis-dashboard archive configure --add "Prod:https://example.com/manifest.json"
    regis-dashboard bootstrap archive -o ./my-archive --platform github
