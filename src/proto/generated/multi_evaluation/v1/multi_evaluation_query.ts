/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'multi_evaluation.v1';

export interface FindMultiEvaluationByIdRequest {
  /** 360度評価ID */
  id: number;
}

export interface FindMultiEvaluationByIdResponse {
  /** 360度評価ID */
  id: number;
  /** ユーザID */
  userId: number;
  /** ユーザID */
  targetUserId: number;
  /** 360度評価期間ID */
  multiTermId: number;
  /** 点数 */
  score: number;
  /** 良い点 */
  goodComment: string;
  /** 改善点 */
  improvementComment: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

export const MULTI_EVALUATION_V1_PACKAGE_NAME = 'multi_evaluation.v1';

export interface MultiEvaluationQueryServiceClient {
  /** 360度評価取得 */

  findMultiEvaluationById(
    request: FindMultiEvaluationByIdRequest,
  ): Observable<FindMultiEvaluationByIdResponse>;
}

export interface MultiEvaluationQueryServiceController {
  /** 360度評価取得 */

  findMultiEvaluationById(
    request: FindMultiEvaluationByIdRequest,
  ):
    | Promise<FindMultiEvaluationByIdResponse>
    | Observable<FindMultiEvaluationByIdResponse>
    | FindMultiEvaluationByIdResponse;
}

export function MultiEvaluationQueryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findMultiEvaluationById'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MultiEvaluationQueryService', method)(
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
      GrpcStreamMethod('MultiEvaluationQueryService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MULTI_EVALUATION_QUERY_SERVICE_NAME =
  'MultiEvaluationQueryService';
