export interface QueuePayload {
  job: string;
  data: any;
  attempt: number;
  availableAt: number;
  queue: string;
}

export interface QueueDriver {
  push(queue: string, payload: QueuePayload): Promise<void>;
  pop(queue: string): Promise<QueuePayload | null>;
}