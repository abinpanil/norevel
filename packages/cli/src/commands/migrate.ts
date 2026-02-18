import { CliCommand } from '../command';
import { MigrationRunner } from '@norevel/orm';

export const migrateCommand: CliCommand = {
  name: 'migrate',
  description: 'Run database migrations',

  async execute({ kernel }) {
    const runner = kernel
      .getApplication()
      .getContainer()
      .resolve(MigrationRunner);

    await runner.migrate();
  }
};
