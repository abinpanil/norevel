import { CliCommand } from '../command';
import { MigrationRunner } from '@norevel/orm';

export const migrateRollbackCommand: CliCommand = {
  name: 'migrate:rollback',
  description: 'Rollback last migration batch',

  async execute({ kernel }) {
    const runner = kernel
      .getApplication()
      .getContainer()
      .resolve(MigrationRunner);

    await runner.rollback();
  }
};
