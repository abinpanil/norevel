import { Kernel } from '@norevel/core';
import { HttpContext } from './types';
import { Router } from './router';

export class HttpRuntime {
  private readonly kernel: Kernel;
  private readonly router: Router;

  constructor(kernel: Kernel, router: Router) {
    this.kernel = kernel;
    this.router = router;
  }

  async handle(context: HttpContext): Promise<void> {
    await this.kernel.execute();

    const handler = this.router.match(context.request);

    if (!handler) {
      context.response.statusCode = 404;
      context.response.end('Not Found');
      return;
    }

    await handler(context);
  }
}
