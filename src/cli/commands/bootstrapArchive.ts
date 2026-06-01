import { Command } from "commander";
import { cpSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

function templatesDir(): string {
  return resolve(__dirname, "..", "templates", "archive");
}

/** Scaffold an archive project into outDir for the given platform. Pure-ish (filesystem only). */
export function scaffoldArchive(
  outDir: string,
  platform: "github" | "gitlab",
): void {
  const tpl = templatesDir();
  mkdirSync(outDir, { recursive: true });

  // always: the post-install note
  copyFileSync(
    join(tpl, "regis-post-install.md"),
    join(outDir, ".regis-post-install.md"),
  );

  if (platform === "github") {
    cpSync(join(tpl, ".github"), join(outDir, ".github"), { recursive: true });
  } else {
    copyFileSync(join(tpl, "gitlab-ci.yml"), join(outDir, ".gitlab-ci.yml"));
  }
}

export function registerBootstrapArchive(program: Command): void {
  const bootstrap =
    program.commands.find((c) => c.name() === "bootstrap") ??
    program.command("bootstrap").description("Scaffold archive/CI projects");

  bootstrap
    .command("archive")
    .description(
      "Scaffold a report-archive project with CI for GitHub or GitLab Pages",
    )
    .requiredOption("-o, --output <dir>", "Directory to scaffold into")
    .option("--platform <platform>", "github | gitlab", "github")
    .action((opts: { output: string; platform: "github" | "gitlab" }) => {
      if (opts.platform !== "github" && opts.platform !== "gitlab") {
        throw new Error(
          `--platform must be 'github' or 'gitlab', got '${opts.platform}'`,
        );
      }
      const out = resolve(opts.output);
      if (
        existsSync(join(out, ".github")) ||
        existsSync(join(out, ".gitlab-ci.yml"))
      ) {
        throw new Error(`${out} already contains an archive scaffold.`);
      }
      scaffoldArchive(out, opts.platform);
      process.stderr.write(
        `Scaffolded ${opts.platform} archive project in ${out}\n`,
      );
    });
}
