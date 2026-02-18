import 'reflect-metadata';
import {
  ServiceDefinition,
  ServiceResolver,
  ServiceToken
} from './types';
import { ScopeContainer } from './scope-container';

export class Container implements ServiceResolver {
  private definitions = new Map<ServiceToken, ServiceDefinition>();
  private singletons = new Map<ServiceToken, unknown>();

  register<T>(
    token: ServiceToken<T>,
    definition: ServiceDefinition<T>
  ): void {
    if (this.definitions.has(token)) {
      throw new Error(
        `Service "${this.tokenToString(token)}" already registered.`
      );
    }

    this.definitions.set(token, definition);
  }

  createScope(): ScopeContainer {
    return new ScopeContainer(this);
  }

  resolve<T>(token: ServiceToken<T>): T {
    const definition = this.definitions.get(token);

    if (!definition) {
      return this.autoResolve(token);
    }

    if (definition.lifetime === 'singleton') {
      if (!this.singletons.has(token)) {
        this.singletons.set(
          token,
          this.instantiate(definition)
        );
      }

      return this.singletons.get(token) as T;
    }

    throw new Error(
      `Scoped or transient service "${this.tokenToString(token)}" must be resolved inside execution scope.`
    );
  }

  getDefinition(token: ServiceToken) {
    return this.definitions.get(token);
  }

  private instantiate<T>(definition: ServiceDefinition<T>): T {
    if (definition.factory) {
      return definition.factory(this);
    }

    if (definition.implementation) {
      return this.construct(definition.implementation);
    }

    throw new Error('Invalid service definition.');
  }

  private autoResolve<T>(token: ServiceToken<T>): T {
    if (typeof token !== 'function') {
      throw new Error(
        `Cannot auto-resolve non-class token "${String(token)}".`
      );
    }

    return this.construct(token);
  }

  private construct<T>(
    target: new (...args: any[]) => T
  ): T {
    const paramTypes =
      Reflect.getMetadata('design:paramtypes', target) || [];

    const dependencies = paramTypes.map((param: any) =>
      this.resolve(param)
    );

    return new target(...dependencies);
  }

  private tokenToString(token: ServiceToken) {
    return typeof token === 'function'
      ? token.name
      : String(token);
  }
}
