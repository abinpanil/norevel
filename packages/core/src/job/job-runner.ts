import { Kernel } from '../kernel';
import { QueueDriver, QueuePayload } from './queue-driver';
import { Job } from './job';
import { JobContext } from './job-context';

export class JobRunner {
  constructor(
    private readonly kernel: Kernel,
    private readonly driver: QueueDriver
  ) {}

  async dispatch(job: Job): Promise<void> {
    const payload: QueuePayload = {
      job: job.constructor.name,
      data: job,
      attempt: 0,
      availableAt: Date.now() + job.delay
    };

    await this.driver.push(payload);
  }

  async work(): Promise<void> {
    while (true) {
      const payload = await this.driver.pop();

      if (!payload) {
        await this.sleep(1000);
        continue;
      }

      if (payload.availableAt > Date.now()) {
        await this.sleep(500);
        continue;
      }

      await this.execute(payload);
    }
  }

  private async execute(payload: QueuePayload) {
    const job: Job = payload.data;
    const maxRetries = job.retries;

    try {
      const context = new JobContext(
        payload.job,
        payload.attempt
      );

      await this.kernel.execute(context);

      await job.handle();
    } catch (error) {
      if (payload.attempt < maxRetries) {
        payload.attempt++;

        await this.driver.push({
          ...payload,
          availableAt: Date.now() + 1000
        });

        return;
      }

      await job.failed(error as Error);
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}