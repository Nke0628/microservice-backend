import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    super.catch(exception, host);
    const response = host.switchToHttp().getResponse();
    const status =
      exception instanceof HttpException
        ? HttpStatus.OK
        : HttpStatus.INTERNAL_SERVER_ERROR;
    return response.status(status).json(exception.cause);
  }
}
