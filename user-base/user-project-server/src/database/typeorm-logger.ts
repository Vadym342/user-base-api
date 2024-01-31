import { PinoLogger } from 'nestjs-pino';
import { Logger as TypeOrmLogger } from 'typeorm';

export class TypeOrmModuleLogger implements TypeOrmLogger {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(TypeOrmModuleLogger.name);
  }

  logQuery(query: string, parameters?: any[]): void {
    this.logger.debug({ query: this.format(query), parameters });
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]): void {
    this.logger.error({ error, query: this.format(query), parameters });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    this.logger.warn({ time, query: this.format(query), parameters });
  }

  logSchemaBuild(message: string): void {
    this.logger.info(message);
  }

  logMigration(message: string): void {
    this.logger.debug(message);
  }

  log(level: 'warn' | 'info' | 'log', message: any): void {
    if (level === 'warn') this.logger.warn(message);
  }

  format(message: string): string {
    return message.replace(/\s+/g, ' ');
  }
}
