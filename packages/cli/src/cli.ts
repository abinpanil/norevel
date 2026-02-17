#!/usr/bin/env node

import { CommandRegistry } from './registry';
import { registerCommands } from './commands';

async function main() {
  const args = process.argv.slice(2);
  const commandName = args[0];

  const registry = new CommandRegistry();
  registerCommands(registry);

  const command =
    registry.resolve(commandName) ??
    registry.resolve('help');

  if (!command) {
    console.error('No commands available.');
    process.exit(1);
  }

  await command.execute();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
