import { CliCommand } from './command';

export class CommandRegistry {
  private readonly commands = new Map<string, CliCommand>();

  register(command: CliCommand): void {
    if (!command.name) {
      throw new Error('CLI command must have a name.');
    }

    if (this.commands.has(command.name)) {
      throw new Error(
        `Command "${command.name}" is already registered.`
      );
    }

    this.commands.set(command.name, command);
  }

  resolve(name: string | undefined): CliCommand | null {
    if (!name) return null;
    return this.commands.get(name) ?? null;
  }

  list(): CliCommand[] {
    return Array.from(this.commands.values());
  }

  has(name: string): boolean {
    return this.commands.has(name);
  }
}
