import { LoggerService } from '@nestjs/common';

export class Logger implements LoggerService {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  error(message: any, trace?: string, context?: string): void {
    console.error(`[ERROR] ${this.getContext(context)} - ${message}`, trace);
  }

  warn(message: any, context?: string): void {
    console.warn(`[WARN] ${this.getContext(context)} - ${message}`);
  }

  log(message: any, context?: string): void {
    console.log(`[LOG] ${this.getContext(context)} - ${message}`);
  }

  debug(message: any, context?: string): void {
    console.debug(`[DEBUG] ${this.getContext(context)} - ${message}`);
  }

  info(message: any, context?: string): void {
    console.info(`[INFO] ${this.getContext(context)} - ${message}`);
  }

  private getContext(context?: string): string {
    return context || this.context || '';
  }
}
