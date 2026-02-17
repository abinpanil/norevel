import { CliCommand } from '../command';
import { bootstrapKernel } from '../kernel';
import { HttpServer, Router, type HttpContext } from '@norevel/http';

export const serveCommand: CliCommand = {
  name: 'serve',
  description: 'Start the HTTP server',

  async execute() {
    const kernel = await bootstrapKernel();
    const router = new Router();

    router.add('GET', '/', ({ response }: HttpContext) => {
      response.end('Norevel is running');
    });

    const server = new HttpServer(kernel, router);
    server.listen({ port: 3000 });
  }
};
