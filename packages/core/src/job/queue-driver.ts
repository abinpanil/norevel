export interface QueuePayload {
  job: string;
  data: any;
  attempt: number;
  availableAt: number;
}

export interface QueueDriver {
  push(payload: QueuePayload): Promise<void>;
  pop(): Promise<QueuePayload | null>;
}