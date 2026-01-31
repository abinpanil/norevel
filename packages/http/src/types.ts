import { IncomingMessage, ServerResponse } from 'http';

export interface HttpContext {
  request: IncomingMessage;
  response: ServerResponse;
}

export type RouteHandler = (context: HttpContext) => void | Promise<void>;