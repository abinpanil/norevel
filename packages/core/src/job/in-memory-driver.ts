import { QueueDriver, QueuePayload } from './queue-driver';

export class InMemoryQueueDriver implements QueueDriver {
  private queue: QueuePayload[] = [];

  async push(payload: QueuePayload): Promise<void> {
    this.queue.push(payload);
  }

  async pop(): Promise<QueuePayload | null> {
    return this.queue.shift() ?? null;
  }
}