import http from 'http';
import { Kernel } from '@norevel/core';
import { HttpRuntime } from './runtime';
import { HttpContext } from './types';

export interface HttpServerOptions {
  port: number;
}

export class HttpServer {
  private readonly kernel: Kernel;
  private readonly runtime: HttpRuntime;

  constructor(kernel: Kernel) {
    this.kernel = kernel;
    this.runtime = new HttpRuntime(kernel);
  }

  listen(options: HttpServerOptions): void {
    const server = http.createServer(async (req, res) => {
      const context: HttpContext = {
        request: req,
        response: res
      };

      try {
        await this.runtime.handle(context);
      } catch (error) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    server.listen(options.port);
  }
}
