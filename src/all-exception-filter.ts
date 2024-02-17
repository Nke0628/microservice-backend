import { Metadata } from '@grpc/grpc-js';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { BaseExceptionFilter } from './base-exception-filter';
import { Status } from '@grpc/grpc-js/build/src/constants';

@Catch(HttpException)
export class AllExceptionFilter implements BaseExceptionFilter {
  catch(e: HttpException, host: ArgumentsHost): Observable<never> {
    // TODO MetaDataの作成
    const metadata = new Metadata();
    metadata.add('grpc-metadata', 'value');

    // HTTP --> gRPCに対応するコード変換
    const code = HTTP_STATUS_CODE_TO_RPC_CODE[e.getStatus()] || Status.UNKNOWN;

    return throwError(() => ({
      code,
      message: e.message,
      metadata,
    }));
  }
}

/** HTTPステータスとgRPCのステータスコードマッピング */
export const HTTP_STATUS_CODE_TO_RPC_CODE = {
  [HttpStatus.OK]: Status.OK,
  [HttpStatus.BAD_REQUEST]: Status.INVALID_ARGUMENT,
  [HttpStatus.UNAUTHORIZED]: Status.UNAUTHENTICATED,
  [HttpStatus.FORBIDDEN]: Status.PERMISSION_DENIED,
  [HttpStatus.NOT_FOUND]: Status.NOT_FOUND,
  [HttpStatus.CONFLICT]: Status.ABORTED,
  [HttpStatus.TOO_MANY_REQUESTS]: Status.RESOURCE_EXHAUSTED,
  [HttpStatus.INTERNAL_SERVER_ERROR]: Status.INTERNAL,
  [HttpStatus.NOT_IMPLEMENTED]: Status.UNIMPLEMENTED,
  [HttpStatus.SERVICE_UNAVAILABLE]: Status.UNAVAILABLE,
  [HttpStatus.GATEWAY_TIMEOUT]: Status.DEADLINE_EXCEEDED,
};
