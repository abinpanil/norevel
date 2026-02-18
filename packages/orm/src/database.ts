export interface DatabaseDriver {
  query<T = any>(
    sql: string,
    bindings?: any[]
  ): Promise<T[]>;
}
