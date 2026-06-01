# Contributing

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
  (Angular type list). Releases are cut by release-please from the commit log.
- `pnpm install && pnpm build && pnpm typecheck` must pass before opening a PR.
- Feature branches → PR → `main` (protected). Rebase on latest `main`; never
  merge `main` back into a feature branch.
