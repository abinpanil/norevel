import { CommandRegistry } from '../registry';
import { serveCommand } from './serve';
import { createHelpCommand  } from './help';

export function registerCommands(
  registry: CommandRegistry
): void {
  registry.register(serveCommand);
  registry.register(createHelpCommand(registry));
}
