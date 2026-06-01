import { Command } from "commander";

export function registerRender(program: Command): void {
  program
    .command("render")
    .description("(implemented in Task 6)")
    .action(() => {
      throw new Error("not implemented");
    });
}
