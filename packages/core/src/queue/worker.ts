import { Kernel } from '../kernel';
import { QueueDriver, QueuePayload } from './queue-driver';
import { WorkerOptions } from './worker-options';
import { Job } from '../job/job';
import { JobContext } from '../job/job-context';

export class Worker {
  private running = false;

  constructor(
    private readonly kernel: Kernel,
    private readonly driver: QueueDriver,
    private readonly options: WorkerOptions = {}
  ) {}

  async start(): Promise<void> {
    this.running = true;

    console.log(`Worker started (queue: ${this.options.queue ?? 'default'})`);

    process.on('SIGINT', async () => {
      console.log('\nGracefully shutting down worker...');
      this.running = false;
    });

    while (this.running) {
      await this.cycle();
    }

    console.log('Worker stopped.');
  }

  private async cycle(): Promise<void> {
    const queue = this.options.queue ?? 'default';
    const sleep = this.options.sleep ?? 1000;

    const payload = await this.driver.pop(queue);

    if (!payload) {
      await this.sleep(sleep);
      return;
    }

    if (payload.availableAt > Date.now()) {
      await this.sleep(500);
      return;
    }

    await this.process(payload);
  }

  private async process(payload: QueuePayload) {
    const job: Job = payload.data;
    const maxTries = this.options.maxTries ?? job.retries;

    try {
      const context = new JobContext(
        payload.job,
        payload.attempt
      );

      await this.kernel.execute(context);
      await job.handle();

      console.log(`Job processed: ${payload.job}`);
    } catch (error) {
      if (payload.attempt < maxTries) {
        payload.attempt++;

        await this.driver.push(payload.queue, {
          ...payload,
          availableAt: Date.now() + 1000
        });

        console.log(`Retrying job: ${payload.job}`);
        return;
      }

      await job.failed(error as Error);
      console.error(`Job permanently failed: ${payload.job}`);
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}