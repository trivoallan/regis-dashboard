import { Command } from "commander";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";

function repoRoot(): string {
  // dist/cli/commands/serve.js -> commands -> cli -> dist -> repo root
  return resolve(__dirname, "..", "..", "..");
}

export function registerServe(program: Command): void {
  program
    .command("serve <report>")
    .description("Build and serve a report locally (static preview)")
    .option("-p, --port <port>", "Port to listen on", "8000")
    .action((report: string, opts: { port: string }) => {
      const root = repoRoot();
      const staticDir = join(root, "static");
      mkdirSync(staticDir, { recursive: true });
      writeFileSync(
        join(staticDir, "report.json"),
        readFileSync(resolve(report), "utf8"),
        "utf8",
      );

      // Build once, then serve the static output (matches the dropped FastAPI preview's behavior).
      execFileSync("pnpm", ["run", "build"], {
        cwd: root,
        env: { ...process.env, REPORT_BASE_URL: "/", NODE_ENV: "production" },
        stdio: "inherit",
      });
      // No "--" separator: this pnpm version forwards it literally to the
      // script, so docusaurus would treat "--" as a positional dir argument.
      execFileSync("pnpm", ["run", "serve", "--port", opts.port], {
        cwd: root,
        stdio: "inherit",
      });
    });
}
