import { ExecutionContext } from '../execution-context';

export class JobContext implements ExecutionContext<undefined> {
  public readonly type = 'job';
  public readonly payload = undefined;

  constructor(
    public readonly jobName: string,
    public readonly attempt: number
  ) {}
}