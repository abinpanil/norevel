import { Connection } from './connection';

export class QueryBuilder<T = any> {
  private tableName!: string;
  private whereClauses: string[] = [];
  private bindings: any[] = [];
  private limitValue?: number;

  constructor(
    private readonly connection: Connection
  ) {}

  table(name: string): this {
    this.tableName = name;
    return this;
  }

  where(column: string, value: any): this {
    this.whereClauses.push(`${column} = ?`);
    this.bindings.push(value);
    return this;
  }

  limit(value: number): this {
    this.limitValue = value;
    return this;
  }

  async get(): Promise<T[]> {
    const sql = this.buildSelect();
    return this.connection.query<T>(sql, this.bindings);
  }

  async first(): Promise<T | null> {
    this.limit(1);
    const results = await this.get();
    return results[0] ?? null;
  }

  private buildSelect(): string {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (this.whereClauses.length > 0) {
      sql += ` WHERE ${this.whereClauses.join(' AND ')}`;
    }

    if (this.limitValue !== undefined) {
      sql += ` LIMIT ${this.limitValue}`;
    }

    return sql;
  }
}
