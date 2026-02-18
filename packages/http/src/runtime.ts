import { Kernel } from '@norevel/core';
import { HttpContext } from './types';
import { Router } from './router';
import { ExecutionContext } from '@norevel/core';

export class HttpRuntime {
  private readonly kernel: Kernel;
  private readonly router: Router;

  constructor(kernel: Kernel, router: Router) {
    this.kernel = kernel;
    this.router = router;
  }

  async handle(context: HttpContext): Promise<void> {
    const executionContext: ExecutionContext<HttpContext> = {
      type: 'http',
      payload: context
    };

    await this.kernel.execute(executionContext);

    const handler = this.router.match(context.request);

    if (!handler) {
      context.response.statusCode = 404;
      context.response.end('Not Found');
      return;
    }

    if (typeof handler === 'function') {
      await handler(context);
      return;
    }

    const scope = this.kernel.getScope();
    if (!scope) {
      throw new Error('No execution scope available.');
    }

    const controllerInstance = scope.resolve(handler.controller);

    if (controllerInstance.before) {
      await controllerInstance.before();
    }

    const result = await controllerInstance[handler.action](context);

    if (controllerInstance.after) {
      await controllerInstance.after();
    }

    if (result !== undefined) {
      context.response.end(String(result));
    }
  }
}
