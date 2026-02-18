import { Connection } from '../connection';

export abstract class Migration {
  abstract up(connection: Connection): Promise<void>;
  abstract down(connection: Connection): Promise<void>;
}
