import { Command } from "commander";
import { resolve } from "node:path";
import {
  loadArchives,
  addArchive,
  removeArchive,
  writeArchives,
} from "../lib/archivesConfig";

export function registerArchiveConfigure(program: Command): void {
  const archive =
    program.commands.find((c) => c.name() === "archive") ??
    program.command("archive").description("Manage the report archive");

  archive
    .command("configure")
    .option("-o, --output <file>", "Path to archives.json", "archives.json")
    .option("--add <entry>", 'Add an archive: "Name:path-or-url"')
    .option("--remove <name>", "Remove an archive by name")
    .option("--list", "List configured archives and exit", false)
    .action(
      (opts: {
        output: string;
        add?: string;
        remove?: string;
        list: boolean;
      }) => {
        const file = resolve(opts.output);
        let archives = loadArchives(file);

        if (opts.list) {
          if (archives.length === 0)
            process.stderr.write("No archives configured.\n");
          else
            archives.forEach((a) =>
              process.stdout.write(`  ${a.name}: ${a.path}\n`),
            );
          return;
        }
        if (opts.remove) {
          archives = removeArchive(archives, opts.remove);
          writeArchives(file, archives);
          process.stderr.write(
            `Removed '${opts.remove}'. ${archives.length} remaining.\n`,
          );
          return;
        }
        if (opts.add) {
          const idx = opts.add.indexOf(":");
          if (idx < 0)
            throw new Error(
              `Invalid format: ${opts.add}. Expected "Name:path-or-url".`,
            );
          const name = opts.add.slice(0, idx);
          const path = opts.add.slice(idx + 1);
          archives = addArchive(archives, name, path);
          writeArchives(file, archives);
          process.stderr.write(`Added '${name}' -> ${path}\n`);
          return;
        }
        process.stderr.write(
          'Nothing to do. Use --add "Name:path", --remove NAME, or --list.\n',
        );
      },
    );
}
