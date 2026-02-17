import { ServiceDefinition, ServiceResolver } from './types';
import { ScopeContainer } from './scope-container';

export class Container implements ServiceResolver {
  private readonly definitions = new Map<
    symbol | string,
    ServiceDefinition
  >();

  private readonly singletons = new Map<
    symbol | string,
    unknown
  >();

  register<T>(
    token: symbol | string,
    definition: ServiceDefinition<T>
  ): void {
    if (this.definitions.has(token)) {
      throw new Error(`Service "${String(token)}" already registered.`);
    }

    this.definitions.set(token, definition);
  }

  createScope(): ScopeContainer {
    return new ScopeContainer(this);
  }

  resolve<T>(token: symbol | string): T {
    const definition = this.definitions.get(token);

    if (!definition) {
      throw new Error(`Service "${String(token)}" not found.`);
    }

    if (definition.lifetime === 'singleton') {
      if (!this.singletons.has(token)) {
        const instance = definition.factory(this);
        this.singletons.set(token, instance);
      }

      return this.singletons.get(token) as T;
    }

    throw new Error(
      `Scoped service "${String(token)}" must be resolved within an execution scope.`
    );
  }

  getDefinition(token: symbol | string) {
    return this.definitions.get(token);
  }
}
