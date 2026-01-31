import { Application } from './application';
import { LifecyclePhase } from './lifecycle';

export class Kernel {
  private readonly app: Application;

  constructor(app?: Application) {
    this.app = app ?? new Application();
  }

  getApplication(): Application {
    return this.app;
  }

  async boot(): Promise<void> {
    await this.app.runPhase(LifecyclePhase.Initialize);
    await this.app.runPhase(LifecyclePhase.LoadConfig);
    await this.app.runPhase(LifecyclePhase.RegisterModules);
    await this.app.runPhase(LifecyclePhase.PrepareRuntime);
  }

  async execute(): Promise<void> {
    await this.app.runPhase(LifecyclePhase.Execute);
  }

  async shutdown(): Promise<void> {
    await this.app.runPhase(LifecyclePhase.Shutdown);
  }

  async run(): Promise<void> {
    await this.boot();
    await this.execute();
    await this.shutdown();
  }
}
