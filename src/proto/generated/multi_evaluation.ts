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
  isCurrentTerm: boolean;
}

export interface MultiEvaluation {
  id: number;
  userId: number;
  targetUserId: number;
  multiTermId: number;
  score: number;
  goodComment: string;
  improvementComment: string;
}

export interface User {
  id: number;
  name: string;
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

export interface FetchByTermIdAndUserIdRequst {
  termid: number;
  userId: number;
}

export interface FetchByTermIdAndUserIdResponse {
  status: number;
  error: string;
  data: MultiEvaluation[];
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

export interface FindUserByIdRequest {
  userId: number;
}

export interface FindUserByIdResponse {
  status: number;
  error: string;
  data: User | undefined;
}

export interface FetchUsersByIdsRequest {
  userIds: number[];
}

export interface FetchUsersByIdsResponse {
  status: number;
  error: string;
  data: User[];
}

export const MULTI_EVALUATION_V1_PACKAGE_NAME = 'multi_evaluation.v1';

export interface MultiEvaluationServiceClient {
  /** MultiBusinessTerm */

  fetchAll(request: FetchAllRequest): Observable<FetchAllResponse>;

  fetchByTermIdAndUserId(
    request: FetchByTermIdAndUserIdRequst,
  ): Observable<FetchByTermIdAndUserIdResponse>;

  /** MultiEvaluation */

  submitMultiEvaluation(
    request: SubmitMultiEvaluationRequest,
  ): Observable<SubmitMultiEvaluationResponse>;

  /** User */

  findUserById(request: FindUserByIdRequest): Observable<FindUserByIdResponse>;

  fetchUsersByIds(
    request: FetchUsersByIdsRequest,
  ): Observable<FetchUsersByIdsResponse>;
}

export interface MultiEvaluationServiceController {
  /** MultiBusinessTerm */

  fetchAll(
    request: FetchAllRequest,
  ):
    | Promise<FetchAllResponse>
    | Observable<FetchAllResponse>
    | FetchAllResponse;

  fetchByTermIdAndUserId(
    request: FetchByTermIdAndUserIdRequst,
  ):
    | Promise<FetchByTermIdAndUserIdResponse>
    | Observable<FetchByTermIdAndUserIdResponse>
    | FetchByTermIdAndUserIdResponse;

  /** MultiEvaluation */

  submitMultiEvaluation(
    request: SubmitMultiEvaluationRequest,
  ):
    | Promise<SubmitMultiEvaluationResponse>
    | Observable<SubmitMultiEvaluationResponse>
    | SubmitMultiEvaluationResponse;

  /** User */

  findUserById(
    request: FindUserByIdRequest,
  ):
    | Promise<FindUserByIdResponse>
    | Observable<FindUserByIdResponse>
    | FindUserByIdResponse;

  fetchUsersByIds(
    request: FetchUsersByIdsRequest,
  ):
    | Promise<FetchUsersByIdsResponse>
    | Observable<FetchUsersByIdsResponse>
    | FetchUsersByIdsResponse;
}

export function MultiEvaluationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'fetchAll',
      'fetchByTermIdAndUserId',
      'submitMultiEvaluation',
      'findUserById',
      'fetchUsersByIds',
    ];
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
