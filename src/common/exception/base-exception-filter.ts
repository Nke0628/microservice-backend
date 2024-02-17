import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable } from 'rxjs';

export abstract class BaseExceptionFilter<T = any> implements ExceptionFilter {
  abstract catch(exception: any, host: ArgumentsHost): Observable<never>;
}
