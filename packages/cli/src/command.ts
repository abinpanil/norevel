import type { Kernel } from '@norevel/core';

export interface CliCommand {
  name: string;
  description: string;

  execute(options: {
    kernel: Kernel;
    args: string[];
    watch?: boolean;
  }): Promise<void>;
}
