import { Container } from './container';
import { LifecyclePhase, LifecycleHook } from './lifecycle';

export class Application {
  private readonly container: Container;
  private readonly hooks = new Map<LifecyclePhase, LifecycleHook[]>();
  private currentPhase: LifecyclePhase | null = null;

  constructor() {
    this.container = new Container();
  }

  getContainer(): Container {
    return this.container;
  }

  getPhase(): LifecyclePhase | null {
    return this.currentPhase;
  }

  registerHook(phase: LifecyclePhase, hook: LifecycleHook): void {
    const existing = this.hooks.get(phase) ?? [];
    existing.push(hook);
    this.hooks.set(phase, existing);
  }

  async runPhase(phase: LifecyclePhase): Promise<void> {
    this.currentPhase = phase;

    const hooks = this.hooks.get(phase) ?? [];
    for (const hook of hooks) {
      await hook();
    }
  }
}
