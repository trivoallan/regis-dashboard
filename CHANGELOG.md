# Changelog

## [0.2.0](https://github.com/trivoallan/regis-dashboard/compare/regis-dashboard-v0.1.0...regis-dashboard-v0.2.0) (2026-06-01)


### Features

* **cli:** add 'archive add' command ([92fd69b](https://github.com/trivoallan/regis-dashboard/commit/92fd69bd3d7497fa4e36290871445f72e0fffca1))
* **cli:** add 'archive configure' command + archives.json config ([7aafce9](https://github.com/trivoallan/regis-dashboard/commit/7aafce9f27721f8b490573ea2855710482912fa9))
* **cli:** add 'bootstrap archive' command + templates ([69771f1](https://github.com/trivoallan/regis-dashboard/commit/69771f1bfa219509173b6e4169f66ca2f0ba7e1a))
* **cli:** add 'render' command (static report site build) ([6f4b939](https://github.com/trivoallan/regis-dashboard/commit/6f4b93902e7f5702ef570cce64b4389f1e84d182))
* **cli:** add 'serve' command (static preview) ([e3638db](https://github.com/trivoallan/regis-dashboard/commit/e3638db19e16d04c4561cb1be593c30407068d27))
* **cli:** port archive store (addToArchive + manifest) ([fc06284](https://github.com/trivoallan/regis-dashboard/commit/fc062841a1fc39454534befe71aed9a006bef848))
* **cli:** port archive summary + status logic ([c05b640](https://github.com/trivoallan/regis-dashboard/commit/c05b6405816f9d26bf50651c40527810673dfcf0))
* **cli:** regis-dashboard CLI + Docker image (Phase 1b) ([482cdf1](https://github.com/trivoallan/regis-dashboard/commit/482cdf1142718e5d961432e34e7612a834c1cf1f))
* **cli:** regis-dashboard CLI + Docker image (Phase 1b) ([482cdf1](https://github.com/trivoallan/regis-dashboard/commit/482cdf1142718e5d961432e34e7612a834c1cf1f))
* **cli:** scaffold regis-dashboard CLI (commander + vitest) ([d16dd4f](https://github.com/trivoallan/regis-dashboard/commit/d16dd4fa387dd17d0e86f7f6a1081e28890e081f))
* **compat:** add checkSchemaCompat with declared supported range ([a8eb7a3](https://github.com/trivoallan/regis-dashboard/commit/a8eb7a3d3564851839ac7b630173e8b79a2ac689))
* **compat:** gate rendering on report schemaVersion in ReportProvider ([a5d90a7](https://github.com/trivoallan/regis-dashboard/commit/a5d90a7e51d8855e01017e37d8ba28582c832734))
* **compat:** runtime schemaVersion gate + cross-repo contract test (Phase 1c) ([84e3bf5](https://github.com/trivoallan/regis-dashboard/commit/84e3bf5a7360044142565677fdb3120d91047bcf))
* **compat:** runtime schemaVersion gate + cross-repo contract test (Phase 1c) ([84e3bf5](https://github.com/trivoallan/regis-dashboard/commit/84e3bf5a7360044142565677fdb3120d91047bcf))

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
