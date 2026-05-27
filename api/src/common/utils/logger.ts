import { Logger } from '@nestjs/common';

export interface ILogContext {
  userId?: string;
  requestId?: string;
  [key: string]: any;
}

export class CustomLogger extends Logger {
  private context?: string;
  private contextData?: ILogContext;

  setContext(context: string, contextData?: ILogContext): void {
    this.context = context;
    this.contextData = contextData;
  }

  log(message: string, data?: any): void {
    super.log(this.formatMessage(message, data), this.context);
  }

  error(message: string, data?: any, trace?: string): void {
    super.error(this.formatMessage(message, data), trace, this.context);
  }

  warn(message: string, data?: any): void {
    super.warn(this.formatMessage(message, data), this.context);
  }

  debug(message: string, data?: any): void {
    super.debug(this.formatMessage(message, data), this.context);
  }

  private formatMessage(message: string, data?: any): string {
    if (!data) return message;

    if (typeof data === 'object') {
      return `${message} ${JSON.stringify({ ...this.contextData, ...data })}`;
    }

    return `${message} ${data}`;
  }
}
