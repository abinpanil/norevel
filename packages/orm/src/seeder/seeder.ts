import { Connection } from '../connection';

export abstract class Seeder {
  abstract run(connection: Connection): Promise<void>;
}