import { Kernel } from '@norevel/core';

export async function bootstrapKernel(): Promise<Kernel> {
  const kernel = new Kernel();

  await kernel.boot();

  return kernel;
}