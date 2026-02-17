import { CliCommand } from '../command';

export const helpCommand: CliCommand = {
  name: 'help',
  description: 'Show help',

  async execute() {
    console.log('Norevel CLI');
    console.log('  serve - Start the HTTP server');
    console.log('  help  - Show this help message');
  }
};
