import { Container } from './container';
import { ServiceResolver } from './types';

export class ScopeContainer implements ServiceResolver {
  private readonly scopedInstances = new Map<
    symbol | string,
    unknown
  >();

  constructor(private readonly root: Container) {}

  resolve<T>(token: symbol | string): T {
    const definition = this.root.getDefinition(token);

    if (!definition) {
      throw new Error(`Service "${String(token)}" not found.`);
    }

    if (definition.lifetime === 'singleton') {
      return this.root.resolve<T>(token);
    }

    if (!this.scopedInstances.has(token)) {
      const instance = definition.factory(this);
      this.scopedInstances.set(token, instance);
    }

    return this.scopedInstances.get(token) as T;
  }
}
