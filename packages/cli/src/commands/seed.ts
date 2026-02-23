import { CliCommand } from '../command';
import { SeederRunner } from '@norevel/orm';

export const seedCommand: CliCommand = {
  name: 'db:seed',
  description: 'Run database seeders',

  async execute({ kernel, args }) {
    const runner = kernel
      .getApplication()
      .getContainer()
      .resolve(SeederRunner);

    const seederName = args[0];

    await runner.run(seederName);
  }
};