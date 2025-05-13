import { LoggerService } from '@nestjs/common';

export class Logger implements LoggerService {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  error(message: string | object | unknown, trace?: string, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${this.getContext(context)} - ${formattedMessage}`, trace);
  }

  warn(message: string | object | unknown, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    // eslint-disable-next-line no-console
    console.warn(`[WARN] ${this.getContext(context)} - ${formattedMessage}`);
  }

  log(message: string | object | unknown, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    // eslint-disable-next-line no-console
    console.log(`[LOG] ${this.getContext(context)} - ${formattedMessage}`);
  }

  debug(message: string | object | unknown, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    // eslint-disable-next-line no-console
    console.debug(`[DEBUG] ${this.getContext(context)} - ${formattedMessage}`);
  }

  info(message: string | object | unknown, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    // eslint-disable-next-line no-console
    console.info(`[INFO] ${this.getContext(context)} - ${formattedMessage}`);
  }

  private getContext(context?: string): string {
    return context || this.context || '';
  }

  private formatMessage(message: string | object | unknown): string {
    if (typeof message === 'string') {
      return message;
    } else if (message instanceof Error) {
      return message.stack || message.message;
    } else if (message === null) {
      return 'null';
    } else if (message === undefined) {
      return 'undefined';
    } else if (typeof message === 'object') {
      try {
        return JSON.stringify(message);
      } catch {
        return String(message);
      }
    }
    return String(message);
  }
}
