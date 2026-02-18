export enum LifecyclePhase {
  Initialize = 'initialize',
  LoadConfig = 'load_config',
  RegisterModules = 'register_modules',
  PrepareRuntime = 'prepare_runtime',
  Execute = 'execute',
  Shutdown = 'shutdown',
  Boot = 'boot',
  Register = 'register',
}

export type LifecycleHook = () => void | Promise<void>;

export type KernelHookTiming = 'before' | 'after';