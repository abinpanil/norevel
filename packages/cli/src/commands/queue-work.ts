import { CliCommand } from '../command';
import { Worker, InMemoryQueueDriver } from '@norevel/core';

export const queueWorkCommand: CliCommand = {
  name: 'queue:work',
  description: 'Start queue worker',

  async execute({ kernel, args }) {
    const queue = args[0] ?? 'default';

    const driver = kernel
      .getApplication()
      .getContainer()
      .resolve(InMemoryQueueDriver);

    const worker = new Worker(kernel, driver, {
      queue
    });

    await worker.start();
  }
};