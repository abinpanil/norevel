import { DatabaseDriver } from './database';

export class Connection {
  constructor(
    private readonly driver: DatabaseDriver
  ) {}

  async query<T = any>(
    sql: string,
    bindings: any[] = []
  ): Promise<T[]> {
    return this.driver.query<T>(sql, bindings);
  }
}
