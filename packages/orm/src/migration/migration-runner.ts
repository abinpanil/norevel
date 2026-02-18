import fs from 'node:fs';
import path from 'node:path';
import { Connection } from '../connection';
import { Migration } from './migration';
import { MigrationRepository } from './migration-repository';

export class MigrationRunner {
  private migrationsPath = path.resolve(process.cwd(), 'migrations');

  constructor(
    private connection: Connection,
    private repository: MigrationRepository
  ) {}

  async migrate(): Promise<void> {
    await this.repository.ensureTable();

    const files = this.getMigrationFiles();
    const ran = await this.repository.getRan();

    const pending = files.filter(file => !ran.includes(file));

    if (pending.length === 0) {
      console.log('No pending migrations.');
      return;
    }

    const batch = (await this.repository.getLastBatch()) + 1;

    for (const file of pending) {
      console.log(`Running migration: ${file}`);

      const migration = await this.loadMigration(file);
      await migration.up(this.connection);

      await this.repository.log(file, batch);
    }

    console.log('Migrations completed.');
  }

  async rollback(): Promise<void> {
    const migrations = await this.repository.getLastBatchMigrations();

    if (migrations.length === 0) {
      console.log('No migrations to rollback.');
      return;
    }

    for (const file of migrations.reverse()) {
      console.log(`Rolling back: ${file}`);

      const migration = await this.loadMigration(file);
      await migration.down(this.connection);

      await this.repository.delete(file);
    }

    console.log('Rollback completed.');
  }

  private getMigrationFiles(): string[] {
    if (!fs.existsSync(this.migrationsPath)) {
      return [];
    }

    return fs
      .readdirSync(this.migrationsPath)
      .filter(file => file.endsWith('.js') || file.endsWith('.ts'))
      .sort();
  }

  private async loadMigration(file: string): Promise<Migration> {
    const fullPath = path.join(this.migrationsPath, file);
    const module = await import(fullPath);

    const MigrationClass = module.default;
    return new MigrationClass();
  }
}
