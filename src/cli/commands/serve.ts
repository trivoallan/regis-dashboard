import { Command } from "commander";

export function registerServe(program: Command): void {
  program
    .command("serve")
    .description("(implemented in Task 7)")
    .action(() => {
      throw new Error("not implemented");
    });
}
