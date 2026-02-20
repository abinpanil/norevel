import fs from 'node:fs';
import path from 'node:path';
import { Connection } from '../connection';
import { Migration } from './migration';
import { MigrationRepository } from './migration-repository';

export class MigrationRunner {
  private migrationsPath: string;

  constructor(
    private connection: Connection,
    private repository: MigrationRepository,
    migrationsPath?: string
  ) {
    this.migrationsPath = migrationsPath ?? path.resolve(process.cwd(), 'migrations');
  }

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

      try {
        const migration = await this.loadMigration(file);
        await migration.up(this.connection);
        await this.repository.log(file, batch);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Migration "${file}" failed: ${message}`);
      }
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

      try {
        const migration = await this.loadMigration(file);
        await migration.down(this.connection);
        await this.repository.delete(file);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Rollback of "${file}" failed: ${message}`);
      }
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

    // Support default export
    if (module.default && typeof module.default === 'function') {
      return new module.default();
    }

    // Fall back to the first exported class
    for (const key of Object.keys(module)) {
      if (typeof module[key] === 'function' && module[key].prototype) {
        return new module[key]();
      }
    }

    throw new Error(
      `Migration file "${file}" does not export a valid Migration class.`
    );
  }
}
