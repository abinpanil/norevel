export type ExecutionType =
  | 'http'
  | 'cli'
  | 'job'
  | 'schedule';

export interface ExecutionContext<T = unknown> {
  type: ExecutionType;
  payload: T;
}

export const EXECUTION_CONTEXT = Symbol('EXECUTION_CONTEXT');
