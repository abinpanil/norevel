import { Kernel } from '@norevel/core';
import { HttpContext } from './types';

export class HttpRuntime {
  private readonly kernel: Kernel;

  constructor(kernel: Kernel) {
    this.kernel = kernel;
  }

  async handle(context: HttpContext): Promise<void> {
    // Future: attach context to execution scope
    // For now: lifecycle execution only
    await this.kernel.execute();

    // Default response (placeholder)
    context.response.statusCode = 200;
    context.response.end('OK');
  }
}
