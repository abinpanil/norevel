import { DatabaseDriver } from '../database';

export class MockDriver implements DatabaseDriver {
  async query<T = any>(
    sql: string,
    bindings: any[] = []
  ): Promise<T[]> {
    console.log('SQL:', sql);
    console.log('Bindings:', bindings);
    return [];
  }
}
