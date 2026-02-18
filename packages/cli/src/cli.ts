#!/usr/bin/env node

import { CommandRegistry } from './registry';
import { registerCommands } from './commands';
import { bootstrapKernel } from './kernel';

async function main() {
  const args = process.argv.slice(2);
  const commandName = args[0];
  const commandArgs = args.slice(1);

  const registry = new CommandRegistry();
  registerCommands(registry);

  const command =
    registry.resolve(commandName) ??
    registry.resolve('help');

  if (!command) {
    console.error('No commands available.');
    process.exit(1);
  }

  const kernel = await bootstrapKernel();

  await command.execute({
    kernel,
    args: commandArgs
  });
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
