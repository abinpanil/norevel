import {
  ServiceResolver,
  ServiceToken
} from './types';
import { Container } from './container';

export class ScopeContainer implements ServiceResolver {
  private scopedInstances = new Map<ServiceToken, unknown>();

  constructor(private readonly root: Container) {}

  resolve<T>(token: ServiceToken<T>): T {
    const definition = this.root.getDefinition(token);

    if (!definition) {
      return this.root.resolve(token);
    }

    if (definition.lifetime === 'singleton') {
      return this.root.resolve(token);
    }

    if (definition.lifetime === 'transient') {
      return this.instantiate(definition);
    }

    if (!this.scopedInstances.has(token)) {
      this.scopedInstances.set(
        token,
        this.instantiate(definition)
      );
    }

    return this.scopedInstances.get(token) as T;
  }

  bindInstance<T>(
    token: ServiceToken<T>,
    instance: T
  ): void {
    this.scopedInstances.set(token, instance);
  }

  private instantiate(definition: any) {
    if (definition.factory) {
      return definition.factory(this);
    }

    if (definition.implementation) {
      const paramTypes =
        Reflect.getMetadata(
          'design:paramtypes',
          definition.implementation
        ) || [];

      const deps = paramTypes.map((param: any) =>
        this.resolve(param)
      );

      return new definition.implementation(...deps);
    }

    throw new Error('Invalid service definition.');
  }
}
