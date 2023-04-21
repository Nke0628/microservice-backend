/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "multi_evaluation.v1";

export interface MultiBusinessTerm {
  id: number;
  businessTermName: string;
  businessTermStartDate: string;
  businessTermEndDate: string;
  multiTermStartDate: string;
  multiTermEndDate: string;
  isCurrentTerm: boolean;
}

export interface FetchAllRequest {
  take: number;
  orderBy: boolean;
}

export interface FetchAllResponse {
  status: number;
  error: string;
  data: MultiBusinessTerm[];
}

export interface SubmitMultiEvaluationRequest {
  userId: number;
  targetUserId: number;
  multiTermId: number;
  score: number;
  comment: string;
}

export interface SubmitMultiEvaluationResponse {
  status: number;
  error: string;
}

export const MULTI_EVALUATION_V1_PACKAGE_NAME = "multi_evaluation.v1";

export interface MultiEvaluationServiceClient {
  fetchAll(request: FetchAllRequest): Observable<FetchAllResponse>;

  submitMultiEvaluation(request: SubmitMultiEvaluationRequest): Observable<SubmitMultiEvaluationResponse>;
}

export interface MultiEvaluationServiceController {
  fetchAll(request: FetchAllRequest): Promise<FetchAllResponse> | Observable<FetchAllResponse> | FetchAllResponse;

  submitMultiEvaluation(
    request: SubmitMultiEvaluationRequest,
  ): Promise<SubmitMultiEvaluationResponse> | Observable<SubmitMultiEvaluationResponse> | SubmitMultiEvaluationResponse;
}

export function MultiEvaluationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["fetchAll", "submitMultiEvaluation"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MultiEvaluationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MultiEvaluationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MULTI_EVALUATION_SERVICE_NAME = "MultiEvaluationService";
