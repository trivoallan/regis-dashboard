import { Command } from "commander";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { addToArchive } from "../lib/archiveStore";

export function registerArchiveAdd(program: Command): void {
  const archive =
    program.commands.find((c) => c.name() === "archive") ??
    program.command("archive").description("Manage the report archive");

  archive
    .command("add <report_file>")
    .requiredOption(
      "-A, --archive-dir <dir>",
      "Archive directory to add the report to",
    )
    .option(
      "--print-path",
      "Print only the archived report path (machine-readable)",
      false,
    )
    .action(
      (
        reportFile: string,
        opts: { archiveDir: string; printPath: boolean },
      ) => {
        let report: unknown;
        try {
          report = JSON.parse(readFileSync(resolve(reportFile), "utf8"));
        } catch (e) {
          throw new Error(
            `Could not read ${reportFile}: ${(e as Error).message}`,
          );
        }
        const dest = addToArchive(
          report as Record<string, any>,
          resolve(opts.archiveDir),
        );
        if (opts.printPath) {
          process.stdout.write(dest + "\n");
        } else {
          process.stderr.write(`Archived to ${dest}\n`);
        }
      },
    );
}
