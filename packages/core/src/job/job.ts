export interface JobOptions {
  retries?: number;
  delay?: number; // milliseconds
}

export abstract class Job {
  public readonly retries: number;
  public readonly delay: number;

  constructor(options: JobOptions = {}) {
    this.retries = options.retries ?? 0;
    this.delay = options.delay ?? 0;
  }

  /**
   * Main job logic
   */
  abstract handle(): Promise<void>;

  /**
   * Called when job permanently fails
   */
  async failed(error: Error): Promise<void> {
    console.error('Job failed:', error);
  }
}