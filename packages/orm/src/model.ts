import { Connection } from './connection';
import { QueryBuilder } from './query-builder';
import { ModelConstructor } from './types';

export abstract class Model {
  protected static table: string;

  protected attributes: Record<string, any>;

  constructor(attributes: Record<string, any> = {}) {
    this.attributes = attributes;
  }

  // ---------------------------------
  // Static ActiveRecord API
  // ---------------------------------

  static query<T extends Model>(
    this: ModelConstructor<T>,
    connection: Connection
  ): QueryBuilder<T> {
    return new QueryBuilder<T>(connection)
      .table(this.table);
  }

  static async all<T extends Model>(
    this: ModelConstructor<T>,
    connection: Connection
  ): Promise<T[]> {
    const rows = await this.query(connection).get();
    return rows.map(row => new this(row));
  }

  static async find<T extends Model>(
    this: ModelConstructor<T>,
    connection: Connection,
    id: number
  ): Promise<T | null> {
    const row = await this
      .query(connection)
      .where('id', id)
      .first();

    return row ? new this(row) : null;
  }

  static async where<T extends Model>(
    this: ModelConstructor<T>,
    connection: Connection,
    column: string,
    value: any
  ): Promise<T[]> {
    const rows = await this
      .query(connection)
      .where(column, value)
      .get();

    return rows.map(row => new this(row));
  }

  // ---------------------------------
  // Instance API
  // ---------------------------------

  get(key: string): any {
    return this.attributes[key];
  }

  set(key: string, value: any): void {
    this.attributes[key] = value;
  }

  toJSON(): Record<string, any> {
    return { ...this.attributes };
  }
}
