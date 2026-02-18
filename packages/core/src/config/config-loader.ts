import { Config } from './config';
import { Environment } from './environment';

export class ConfigLoader {
  constructor(
    private readonly env: Environment,
    private readonly config: Config
  ) {}

  load(): void {
    this.config.set('app.name', this.env.get('APP_NAME', 'Norevel'));
    this.config.set('app.env', this.env.get('NODE_ENV', 'development'));
    this.config.set('app.port', Number(this.env.get('PORT', '3000')));
  }
}
