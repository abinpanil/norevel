export type ServiceLifetime = 'singleton' | 'scoped';

export interface ServiceDefinition<T = unknown> {
  lifetime: ServiceLifetime;
  factory: (container: ServiceResolver) => T;
}

export interface ServiceResolver {
  resolve<T>(token: symbol | string): T;
}
