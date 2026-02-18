import { CliCommand } from '../command';
import { CommandRegistry } from '../registry';

export function createHelpCommand(
  registry: CommandRegistry
): CliCommand {
  return {
    name: 'help',
    description: 'Display available commands',

    async execute() {
      console.log('\nNorevelJS CLI\n');
      console.log('Usage: norevel <command>\n');
      console.log('Available commands:\n');

      const commands = registry.list().sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      for (const command of commands) {
        console.log(
          `  ${command.name.padEnd(15)} ${command.description}`
        );
      }

      console.log('\n');
    }
  };
}
