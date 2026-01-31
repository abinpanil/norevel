export enum LifecyclePhase {
  Initialize = 'initialize',
  LoadConfig = 'load_config',
  RegisterModules = 'register_modules',
  PrepareRuntime = 'prepare_runtime',
  Execute = 'execute',
  Shutdown = 'shutdown'
}

export type LifecycleHook = () => void | Promise<void>;
