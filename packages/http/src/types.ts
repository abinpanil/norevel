import { IncomingMessage, ServerResponse } from 'http';

export interface HttpContext {
  request: IncomingMessage;
  response: ServerResponse;
}
