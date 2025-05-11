/**
 * Utilitar pentru logging
 */
export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  /**
   * Logare informații
   * @param message Mesajul de logat
   * @param data Date adiționale
   */
  info(message: string, data?: unknown): void {
    console.log(`[INFO] [${this.context}] ${message}`, data ? data : '');
  }

  /**
   * Logare avertismente
   * @param message Mesajul de logat
   * @param data Date adiționale
   */
  warn(message: string, data?: unknown): void {
    console.warn(`[WARN] [${this.context}] ${message}`, data ? data : '');
  }

  /**
   * Logare erori
   * @param message Mesajul de logat
   * @param trace Stack trace
   * @param data Date adiționale
   */
  error(message: string, trace?: string, data?: unknown): void {
    console.error(`[ERROR] [${this.context}] ${message}`, trace ? trace : '', data ? data : '');
  }

  /**
   * Logare debug
   * @param message Mesajul de logat
   * @param data Date adiționale
   */
  debug(message: string, data?: unknown): void {
    console.debug(`[DEBUG] [${this.context}] ${message}`, data ? data : '');
  }
}
