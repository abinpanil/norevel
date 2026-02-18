import { IncomingMessage } from 'http';
import { RouteHandler } from './types';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Route {
  method: Method;
  path: string;
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];

  add(
    method: Method,
    path: string,
    handler: RouteHandler
  ): void {
    this.routes.push({ method, path, handler });
  }

  match(req: IncomingMessage): RouteHandler | null {
    const method = req.method as Method | undefined;
    const url = req.url;

    if (!method || !url) return null;

    const route = this.routes.find(
      r => r.method === method && r.path === url
    );

    return route?.handler ?? null;
  }
}
