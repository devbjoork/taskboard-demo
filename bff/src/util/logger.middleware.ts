import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP-INBOUND');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length') || '0';

      this.logger.log(
        `${ip} ${method} ${originalUrl} ${statusCode} ${statusMessage} ${contentLength} - ${JSON.stringify(
          body,
        )}`,
      );
    });

    next();
  }
}
