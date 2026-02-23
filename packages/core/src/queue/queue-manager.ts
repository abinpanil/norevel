import { QueueDriver } from './queue-driver';
import { Job } from '../job/job';

export class QueueManager {
  constructor(private readonly driver: QueueDriver) {}

  async dispatch(job: Job, queue = 'default'): Promise<void> {
    await this.driver.push(queue, {
      job: job.constructor.name,
      data: job,
      attempt: 0,
      availableAt: Date.now() + job.delay,
      queue
    });
  }
}