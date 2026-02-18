import { Application } from './application';
import { LifecyclePhase, LifecycleHook } from './lifecycle';
import { EXECUTION_CONTEXT, ExecutionContext } from './execution-context';
import { ScopeContainer } from './scope-container';

type KernelHookMap = Map<LifecyclePhase, LifecycleHook[]>;

export class Kernel {
  private readonly app: Application;

  private readonly beforeHooks: KernelHookMap = new Map();
  private readonly afterHooks: KernelHookMap = new Map();

  private currentContext: ExecutionContext | null = null;
  private currentScope: ScopeContainer | null = null;

  constructor(app?: Application) {
    this.app = app ?? new Application();
  }

  getScope(): ScopeContainer | null {
    return this.currentScope;
  }

  getContext(): ExecutionContext | null {
    return this.currentContext;
  }

  getApplication(): Application {
    return this.app;
  }

  onBefore(phase: LifecyclePhase, hook: LifecycleHook): void {
    const hooks = this.beforeHooks.get(phase) ?? [];
    hooks.push(hook);
    this.beforeHooks.set(phase, hooks);
  }

  onAfter(phase: LifecyclePhase, hook: LifecycleHook): void {
    const hooks = this.afterHooks.get(phase) ?? [];
    hooks.push(hook);
    this.afterHooks.set(phase, hooks);
  }

  private async runHooks(
    hooks: KernelHookMap,
    phase: LifecyclePhase
  ): Promise<void> {
    const list = hooks.get(phase) ?? [];
    for (const hook of list) {
      await hook();
    }
  }

  private async runPhase(phase: LifecyclePhase): Promise<void> {
    await this.runHooks(this.beforeHooks, phase);
    await this.app.runPhase(phase);
    await this.runHooks(this.afterHooks, phase);
  }

  async boot(): Promise<void> {
    await this.runPhase(LifecyclePhase.Initialize);
    await this.runPhase(LifecyclePhase.LoadConfig);
    await this.runPhase(LifecyclePhase.RegisterModules);
    await this.runPhase(LifecyclePhase.PrepareRuntime);
  }

  async execute(context: ExecutionContext): Promise<void> {
    this.currentContext = context;
    const scope = this.app.getContainer().createScope();
    this.currentScope = scope;

    scope.bindInstance(EXECUTION_CONTEXT, context);

    await this.runPhase(LifecyclePhase.Execute);

    this.currentContext = null;
    this.currentScope = null;
  }

  async shutdown(): Promise<void> {
    await this.runPhase(LifecyclePhase.Shutdown);
  }

  async run(context: ExecutionContext): Promise<void> {
    await this.boot();
    await this.execute(context);
    await this.shutdown();
  }
}
