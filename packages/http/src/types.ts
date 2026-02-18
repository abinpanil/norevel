import { IncomingMessage, ServerResponse } from 'http';

export interface HttpContext {
  request: IncomingMessage;
  response: ServerResponse;
}

export type RouteHandler =
  | ((context: HttpContext) => any)
  | {
      controller: new (...args: any[]) => any;
      action: string;
    };