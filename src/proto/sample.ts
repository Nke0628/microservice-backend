/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "evaluation";

export interface FetchMultiTermsRequest {
}

export interface FetchMultiTermsResponese {
  id: number;
  businessTermName: string;
  businessTermStartDate: string;
  businessTermEndDate: string;
  multiTermStartDate: string;
  multiTermEndDate: string;
}

export const EVALUATION_PACKAGE_NAME = "evaluation";

export interface EvaluationServiceClient {
  fetchMultiTerms(request: FetchMultiTermsRequest): Observable<FetchMultiTermsResponese>;
}

export interface EvaluationServiceController {
  fetchMultiTerms(
    request: FetchMultiTermsRequest,
  ): Promise<FetchMultiTermsResponese> | Observable<FetchMultiTermsResponese> | FetchMultiTermsResponese;
}

export function EvaluationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchMultiTerms"];
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
