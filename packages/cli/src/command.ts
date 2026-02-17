export interface CliCommand {
  name: string;
  description: string;
  execute(): Promise<void>;
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
