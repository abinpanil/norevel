import dotenv from 'dotenv';

export class Environment {
  private readonly values: Record<string, string>;

  constructor() {
    dotenv.config();
    this.values = { ...process.env } as Record<string, string>;
  }

  get(key: string, defaultValue?: string): string {
    return this.values[key] ?? defaultValue ?? '';
  }

  has(key: string): boolean {
    return key in this.values;
  }

  all(): Record<string, string> {
    return { ...this.values };
  }
}
