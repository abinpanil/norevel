import { Application } from './application';
import { LifecyclePhase, LifecycleHook } from './lifecycle';
import { EXECUTION_CONTEXT, ExecutionContext } from './execution-context';
import { ScopeContainer } from './scope-container';
import { Config } from './config/config';
import { Environment } from './config/environment';
import { ConfigLoader } from './config/config-loader';
import { Connection } from '@norevel/orm';
import { MockDriver } from '@norevel/orm';
import { MigrationRunner, MigrationRepository } from '@norevel/orm';
import { SeederRunner } from '@norevel/orm';
import { InMemoryQueueDriver as JobInMemoryQueueDriver } from './job/in-memory-driver';
import { InMemoryQueueDriver as QueueInMemoryQueueDriver } from './queue/in-memory-driver';
import { JobRunner } from './job';
import { QueueManager } from './queue';

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
  const container = this.app.getContainer();

  // Register Environment
  container.register(Environment, {
    lifetime: 'singleton',
    implementation: Environment
  });

  // Register Config repository
  container.register(Config, {
    lifetime: 'singleton',
    implementation: Config
  });

  // Register ConfigLoader
  container.register(ConfigLoader, {
    lifetime: 'singleton',
    implementation: ConfigLoader
  });

  // Resolve and load config
  const env = container.resolve(Environment);
  const config = container.resolve(Config);
  const loader = new ConfigLoader(env, config);

  loader.load();

  // Freeze config to prevent runtime mutation
  Object.freeze(config);

  // Register Connection (singleton)
  container.register(Connection, {
    lifetime: 'singleton',
    factory: () => {
      const driver = new MockDriver();
      return new Connection(driver);
    }
  });

  container.register(MigrationRepository, {
    lifetime: 'singleton',
    factory: resolver => {
      const connection = resolver.resolve(Connection);
      return new MigrationRepository(connection);
    }
  });

  container.register(MigrationRunner, {
    lifetime: 'singleton',
    factory: resolver => {
      const connection = resolver.resolve(Connection);
      const repo = resolver.resolve(MigrationRepository);
      return new MigrationRunner(connection, repo);
    }
  });

  container.register(SeederRunner, {
    lifetime: 'singleton',
    factory: resolver => {
      const connection = resolver.resolve(Connection);
      return new SeederRunner(connection);
    }
  });

  container.register(JobInMemoryQueueDriver, {
    lifetime: 'singleton',
    implementation: JobInMemoryQueueDriver
  });

  container.register(JobRunner, {
    lifetime: 'singleton',
    factory: resolver => {
      const driver = resolver.resolve(JobInMemoryQueueDriver);
      return new JobRunner(this, driver);
    }
  });

  container.register(QueueInMemoryQueueDriver, {
    lifetime: 'singleton',
    implementation: QueueInMemoryQueueDriver
  });

  container.register(QueueManager, {
    lifetime: 'singleton',
    factory: resolver =>
      new QueueManager(resolver.resolve(QueueInMemoryQueueDriver))
  });

  await this.runPhase(LifecyclePhase.Boot);
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
