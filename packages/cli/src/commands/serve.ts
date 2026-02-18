import { CliCommand } from '../command';
import { HttpServer, Router, type HttpContext } from '@norevel/http';

export const serveCommand: CliCommand = {
  name: 'serve',
  description: 'Start the HTTP server',

  async execute({ kernel }) {
    const router = new Router();

    // Temporary demo route
    router.add('GET', '/', ({ response }: HttpContext) => {
      response.statusCode = 200;
      response.end('Norevel is running');
    });

    const server = new HttpServer(kernel, router);

    server.listen({ port: 3000 });

    console.log('Norevel server running at http://localhost:3000');

    process.on('SIGINT', async () => {
      console.log('\nShutting down...');
      await kernel.shutdown();
      process.exit(0);
    });
  }
};
