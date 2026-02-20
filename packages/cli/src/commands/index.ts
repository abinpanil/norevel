import { CommandRegistry } from '../registry';
import { serveCommand } from './serve';
import { createHelpCommand  } from './help';
import { makeCommand } from './make';
import { migrateCommand } from './migrate';
import { migrateRollbackCommand } from './migrate-rollback';

export function registerCommands(
  registry: CommandRegistry
): void {
  registry.register(serveCommand);
  registry.register(createHelpCommand(registry));
  registry.register(makeCommand);
  registry.register(migrateCommand);
  registry.register(migrateRollbackCommand);
}
