/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'multi_evaluation.v1';

export interface MultiBusinessTerm {
  id: number;
  businessTermName: string;
  businessTermStartDate: string;
  businessTermEndDate: string;
  multiTermStartDate: string;
  multiTermEndDate: string;
}

export interface FetchAllRequest {}

export interface FetchAllResponse {
  multiBusinessTermList: MultiBusinessTerm[];
}

export interface FindByIdRequest {
  id: number;
}

export interface FindByIdResponse {
  multiBusinessTerm: MultiBusinessTerm | undefined;
}

export const MULTI_EVALUATION_V1_PACKAGE_NAME = 'multi_evaluation.v1';

export interface MultiEvaluationServiceClient {
  fetchAll(request: FetchAllRequest): Observable<FetchAllResponse>;

  findById(request: FindByIdRequest): Observable<FindByIdResponse>;
}

export interface MultiEvaluationServiceController {
  fetchAll(
    request: FetchAllRequest,
  ):
    | Promise<FetchAllResponse>
    | Observable<FetchAllResponse>
    | FetchAllResponse;

  findById(
    request: FindByIdRequest,
  ):
    | Promise<FindByIdResponse>
    | Observable<FindByIdResponse>
    | FindByIdResponse;
}

export function MultiEvaluationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['fetchAll', 'findById'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MultiEvaluationService', method)(
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
      GrpcStreamMethod('MultiEvaluationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MULTI_EVALUATION_SERVICE_NAME = 'MultiEvaluationService';
