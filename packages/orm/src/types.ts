import { Connection } from './connection';
import { QueryBuilder } from './query-builder';
import { Model } from './model';

export interface ModelConstructor<T extends Model> {
  new (attributes?: Record<string, any>): T;
  table: string;
  query(connection: Connection): QueryBuilder<T>;
}
