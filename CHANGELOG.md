# Changelog

## 0.1.0 (2026-06-01)


### ⚠ BREAKING CHANGES

* **analyzer:** the 'trivy' analyzer is replaced by 'cve' (grype) and 'secrets' (trufflehog); SBOM generation now uses syft. Playbooks using 'provider: trivy' must switch to 'provider: cve' / 'provider: secrets', and 'results.trivy.*' becomes 'results.cve.*' / 'results.secrets.*'.
* **analyzer:** the 'skopeo' analyzer is renamed to 'oci'. Rule paths results.skopeo.* become results.oci.* and playbooks must use provider: oci. The output schema is redesigned (raw 'inspect' dump removed; size/exposed_ports/ env now declared).

### Features

* **analyzer:** replace skopeo with regctl, rename analyzer to oci ([#610](https://github.com/trivoallan/regis-dashboard/issues/610)) ([8bbb369](https://github.com/trivoallan/regis-dashboard/commit/8bbb369ae33f5a09af82dd30466ada44cb9327d6))
* **analyzer:** replace trivy with grype (cve), syft (sbom), trufflehog (secrets) ([#620](https://github.com/trivoallan/regis-dashboard/issues/620)) ([1705273](https://github.com/trivoallan/regis-dashboard/commit/1705273eaad83b36764ea62dd5f943ef0b723864))
* **ci:** Sprint 1 — M001 deliverables (snapshot retention, snapshot date, action dogfooding, docs) ([#494](https://github.com/trivoallan/regis-dashboard/issues/494)) ([191603c](https://github.com/trivoallan/regis-dashboard/commit/191603cf52fa85281abd1097e7318220a03a1131))
* **cli:** add GitLab integration to dashboard (API proxy, trigger, webhooks, UI) ([#261](https://github.com/trivoallan/regis-dashboard/issues/261)) ([2189b38](https://github.com/trivoallan/regis-dashboard/commit/2189b385ac2745cb5e24f42bb51e688403587133))
* configure Docusaurus for GitHub Pages (org/project/trailingSlash) ([79e7670](https://github.com/trivoallan/regis-dashboard/commit/79e767023f557b0686b9c0bf254af00002198d1d))


### Bug Fixes

* **ci:** let pnpm/action-setup read version from packageManager ([de7a486](https://github.com/trivoallan/regis-dashboard/commit/de7a486c306d7709d35deb3ca35c27f27bed6da6))
