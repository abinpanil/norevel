import type { Kernel } from '@norevel/core';
export interface CliCommand {
  name: string;
  description: string;

  execute(options: {
    kernel: Kernel;
    args: string[];
  }): Promise<void>;
}

import { serveCommand } from './commands/serve';
import { helpCommand } from './commands/help';

const commands: CliCommand[] = [
  serveCommand,
  helpCommand
];

export function resolveCommand(args: string[]): CliCommand {
  const name = args[0] ?? 'help';
  return commands.find(c => c.name === name) ?? helpCommand;
}
