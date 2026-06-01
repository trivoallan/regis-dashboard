#!/usr/bin/env node
import { Command } from "commander";
import { registerRender } from "./commands/render";
import { registerServe } from "./commands/serve";
import { registerArchiveAdd } from "./commands/archiveAdd";
import { registerArchiveConfigure } from "./commands/archiveConfigure";
import { registerBootstrapArchive } from "./commands/bootstrapArchive";

const program = new Command();
program
  .name("regis-dashboard")
  .description("Render and serve regis container-security reports")
  .version("0.0.0");

registerRender(program);
registerServe(program);
registerArchiveAdd(program);
registerArchiveConfigure(program);
registerBootstrapArchive(program);

program.parseAsync(process.argv);
