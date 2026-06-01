import { Command } from "commander";

export function registerArchiveAdd(program: Command): void {
  const archive =
    program.commands.find((c) => c.name() === "archive") ??
    program.command("archive").description("Manage the report archive");

  archive
    .command("add")
    .description("(implemented in Task 4)")
    .action(() => {
      throw new Error("not implemented");
    });
}
