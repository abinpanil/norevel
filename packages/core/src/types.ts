export type ServiceLifetime =
  | 'singleton'
  | 'scoped'
  | 'transient';

export type ServiceToken<T = unknown> =
  | symbol
  | string
  | (new (...args: any[]) => T);

export interface ServiceDefinition<T = unknown> {
  lifetime: ServiceLifetime;
  implementation?: new (...args: any[]) => T;
  factory?: (resolver: ServiceResolver) => T;
}

export interface ServiceResolver {
  resolve<T>(token: ServiceToken<T>): T;
}
