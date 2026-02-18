export class Config {
  private readonly store = new Map<string, unknown>();

  set(key: string, value: unknown): void {
    this.store.set(key, value);
  }

  get<T = unknown>(key: string): T {
    if (!this.store.has(key)) {
      throw new Error(`Config key "${key}" not found.`);
    }

    return this.store.get(key) as T;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  all(): Record<string, unknown> {
    return Object.fromEntries(this.store.entries());
  }
}
