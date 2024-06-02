/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'microservice_backend.v1';

export interface createMemoRequest {
  id: string;
  content: string;
}

export interface createMemoResponse {
  id: string;
}

export const MICROSERVICE_BACKEND_V1_PACKAGE_NAME = 'microservice_backend.v1';

export interface MemoCommandServiceClient {
  createMemo(request: createMemoRequest): Observable<createMemoResponse>;
}

export interface MemoCommandServiceController {
  createMemo(
    request: createMemoRequest,
  ):
    | Promise<createMemoResponse>
    | Observable<createMemoResponse>
    | createMemoResponse;
}

export function MemoCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createMemo'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MemoCommandService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('MemoCommandService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MEMO_COMMAND_SERVICE_NAME = 'MemoCommandService';
