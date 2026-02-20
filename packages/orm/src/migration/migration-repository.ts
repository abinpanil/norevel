import { Connection } from '../connection';

export class MigrationRepository {
  private table = '_norevel_migrations';

  constructor(private connection: Connection) {}

  async ensureTable(): Promise<void> {
    await this.connection.query(`
      CREATE TABLE IF NOT EXISTS ${this.table} (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        batch INTEGER NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async getRan(): Promise<string[]> {
    const rows = await this.connection.query<{ name: string }>(
      `SELECT name FROM ${this.table}`
    );

    return rows.map(row => row.name);
  }

  async getLastBatch(): Promise<number> {
    const rows = await this.connection.query<{ batch: number }>(
      `SELECT MAX(batch) as batch FROM ${this.table}`
    );

    return rows[0]?.batch ?? 0;
  }

  async log(name: string, batch: number): Promise<void> {
    await this.connection.query(
      `INSERT INTO ${this.table} (name, batch) VALUES (?, ?)`,
      [name, batch]
    );
  }

  async delete(name: string): Promise<void> {
    await this.connection.query(
      `DELETE FROM ${this.table} WHERE name = ?`,
      [name]
    );
  }

  async getLastBatchMigrations(): Promise<string[]> {
    const batch = await this.getLastBatch();

    const rows = await this.connection.query<{ name: string }>(
      `SELECT name FROM ${this.table} WHERE batch = ?`,
      [batch]
    );

    return rows.map(row => row.name);
  }
}
