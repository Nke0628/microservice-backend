/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "evaluation";

export interface MultiBusinessTerm {
  id: number;
  businessTermName: string;
  businessTermStartDate: string;
  businessTermEndDate: string;
  multiTermStartDate: string;
  multiTermEndDate: string;
}

export interface FetchAllRequest {
}

export interface FetchAllResponse {
  multiBusinessTermList: MultiBusinessTerm[];
}

export interface FindByIdRequest {
  id: number;
}

export interface FindByIdResponse {
  multiBusinessTerm: MultiBusinessTerm | undefined;
}

export const EVALUATION_PACKAGE_NAME = "evaluation";

export interface EvaluationServiceClient {
  fetchAll(request: FetchAllRequest): Observable<FetchAllResponse>;

  findById(request: FindByIdRequest): Observable<FindByIdResponse>;
}

export interface EvaluationServiceController {
  fetchAll(request: FetchAllRequest): Promise<FetchAllResponse> | Observable<FetchAllResponse> | FetchAllResponse;

  findById(request: FindByIdRequest): Promise<FindByIdResponse> | Observable<FindByIdResponse> | FindByIdResponse;
}

export function EvaluationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchAll", "findById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("EvaluationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("EvaluationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EVALUATION_SERVICE_NAME = "EvaluationService";
