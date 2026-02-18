import fs from 'node:fs';
import path from 'node:path';
import { CliCommand } from '../command';

export const makeCommand: CliCommand = {
  name: 'make',
  description: 'Generate framework components',

  async execute({ args }) {
    const type = args[0];
    const name = args[1];

    if (!type || !name) {
      console.log('Usage: norevel make <type> <Name>');
      return;
    }

    switch (type) {
      case 'controller':
        generateController(name);
        break;

      case 'service':
        generateService(name);
        break;

      case 'module':
        generateModule(name);
        break;

      default:
        console.log(`Unknown make target: ${type}`);
    }
  }
};

// ------------------------------
// Generators
// ------------------------------

function generateController(name: string) {
  const dir = path.resolve(process.cwd(), 'src/controllers');
  ensureDir(dir);

  const filePath = path.join(dir, `${name}.ts`);

  const template = `
    import { Controller } from '@norevel/core';

    export class ${name} extends Controller {
      async index() {
        return '${name} works!';
      }
    }
  `;

  fs.writeFileSync(filePath, template.trim());
  console.log(`Controller created: ${filePath}`);
}

function generateService(name: string) {
  const dir = path.resolve(process.cwd(), 'src/services');
  ensureDir(dir);

  const filePath = path.join(dir, `${name}.ts`);

  const template = `
    import { Service } from '@norevel/core';

    export class ${name} extends Service {}
  `;

  fs.writeFileSync(filePath, template.trim());
  console.log(`Service created: ${filePath}`);
}

function generateModule(name: string) {
  const dir = path.resolve(process.cwd(), `src/modules/${name}`);
  ensureDir(dir);

  const filePath = path.join(dir, `${name}.module.ts`);

  const template = `
    export class ${name}Module {
      register() {
        // register services and routes here
      }
    }
  `;

  fs.writeFileSync(filePath, template.trim());
  console.log(`Module created: ${filePath}`);
}

// ------------------------------
// Utilities
// ------------------------------

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
