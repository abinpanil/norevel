import http from 'http';
import { Kernel } from '@norevel/core';
import { HttpRuntime } from './runtime';
import { Router } from './router';
import { HttpContext } from './types';

export interface HttpServerOptions {
  port: number;
}

export class HttpServer {
  private readonly kernel: Kernel;
  private readonly router: Router;
  private readonly runtime: HttpRuntime;

  constructor(kernel: Kernel, router: Router) {
    this.kernel = kernel;
    this.router = router;
    this.runtime = new HttpRuntime(kernel, router);
  }

  listen(options: HttpServerOptions): void {
    const server = http.createServer(async (req, res) => {
      const context: HttpContext = { request: req, response: res };

      try {
        await this.runtime.handle(context);
      } catch {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    server.listen(options.port);
  }
}
