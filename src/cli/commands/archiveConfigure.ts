import { Command } from "commander";

export function registerArchiveConfigure(program: Command): void {
  const archive =
    program.commands.find((c) => c.name() === "archive") ??
    program.command("archive").description("Manage the report archive");

  archive
    .command("configure")
    .description("(implemented in Task 5)")
    .action(() => {
      throw new Error("not implemented");
    });
}
