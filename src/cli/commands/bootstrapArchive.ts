import { Command } from "commander";

export function registerBootstrapArchive(program: Command): void {
  const bootstrap =
    program.commands.find((c) => c.name() === "bootstrap") ??
    program.command("bootstrap").description("Scaffold archive/CI projects");

  bootstrap
    .command("archive")
    .description("(implemented in Task 8)")
    .action(() => {
      throw new Error("not implemented");
    });
}
