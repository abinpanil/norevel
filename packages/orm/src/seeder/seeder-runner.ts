import fs from 'node:fs';
import path from 'node:path';
import { Connection } from '../connection';
import { Seeder } from './seeder';

export class SeederRunner {
  private seedersPath = path.resolve(process.cwd(), 'seeders');

  constructor(private readonly connection: Connection) {}

  async run(name?: string): Promise<void> {
    if (name) {
      await this.runSingle(name);
      return;
    }

    const files = this.getSeederFiles();

    for (const file of files) {
      await this.runFile(file);
    }

    console.log('Seeding completed.');
  }

  private getSeederFiles(): string[] {
    if (!fs.existsSync(this.seedersPath)) {
      return [];
    }

    return fs
      .readdirSync(this.seedersPath)
      .filter(file => file.endsWith('.js') || file.endsWith('.ts'))
      .sort();
  }

  private async runSingle(name: string) {
    const file = `${name}.ts`;
    await this.runFile(file);
  }

  private async runFile(file: string) {
    console.log(`Running seeder: ${file}`);

    const fullPath = path.join(this.seedersPath, file);
    const module = await import(fullPath);

    const SeederClass = module.default;
    const seeder: Seeder = new SeederClass();

    await seeder.run(this.connection);
  }
}