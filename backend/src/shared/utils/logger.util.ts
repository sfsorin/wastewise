/**
 * Utilitar pentru logging
 */
import { LoggerService } from '@nestjs/common';

export class Logger implements LoggerService {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  error(message: string | Error | Record<string, unknown>, trace?: string, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    console.error(`[ERROR] ${this.getContext(context)} - ${formattedMessage}`, trace);
  }

  warn(message: string | Error | Record<string, unknown>, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    console.warn(`[WARN] ${this.getContext(context)} - ${formattedMessage}`);
  }

  log(message: string | Error | Record<string, unknown>, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    // eslint-disable-next-line no-console
    console.info(`[LOG] ${this.getContext(context)} - ${formattedMessage}`);
  }

  debug(message: string | Error | Record<string, unknown>, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    console.debug(`[DEBUG] ${this.getContext(context)} - ${formattedMessage}`);
  }

  info(message: string | Error | Record<string, unknown>, context?: string): void {
    const formattedMessage = this.formatMessage(message);
    console.info(`[INFO] ${this.getContext(context)} - ${formattedMessage}`);
  }

  private getContext(context?: string): string {
    return context || this.context || '';
  }

  private formatMessage(
    message: string | Error | Record<string, unknown> | null | undefined,
  ): string {
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
        // Folosim o conversie sigură pentru obiecte
        return `[Object ${Object.prototype.toString.call(message)}]`;
      }
    }
    // Acest caz nu ar trebui să apară niciodată datorită tipurilor de mai sus
    return '[Unknown]';
  }
}
