import { QueueDriver, QueuePayload } from './queue-driver';

export class InMemoryQueueDriver implements QueueDriver {
  private queues: Map<string, QueuePayload[]> = new Map();

  async push(queue: string, payload: QueuePayload): Promise<void> {
    const list = this.queues.get(queue) ?? [];
    list.push(payload);
    this.queues.set(queue, list);
  }

  async pop(queue: string): Promise<QueuePayload | null> {
    const list = this.queues.get(queue);
    if (!list || list.length === 0) {
      return null;
    }

    return list.shift() ?? null;
  }
}