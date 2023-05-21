/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "multi_evaluation.v1";

export interface FetchReportSettingsByTermIdRequest {
  termId: number;
}

export interface ReportSetting {
  reportSettingId: number;
  saveUserId: number;
  savedAt: string;
  reportSettingDetails: ReportSettingDetail[];
}

export interface ReportSettingDetail {
  reportSettingDetailId: number;
  positionLayerName: string;
  positionLayerType: number;
  inputFlg: boolean;
  theme: string;
  charaNum: number;
}

export interface FetchReportSettingsByTermIdResponse {
  data: ReportSetting | undefined;
}

export interface MultiTerm {
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

export interface FetchMultiTermAllRequest {
  take: number;
  orderBy: boolean;
}

export interface FetchMultiTermAllResponse {
  data: MultiTerm[];
}

export interface FetchByTermIdAndUserIdRequst {
  termId: number;
  userId: number;
}

export interface FetchByTermIdAndUserIdResponse {
  data: MultiEvaluation[];
}

export interface SubmitMultiEvaluationRequest {
  userId: number;
  targetUserId: number;
  multiTermId: number;
  score: number;
  goodComment: string;
  improvementComment: string;
}

export interface SubmitMultiEvaluationResponse {
  data: MultiEvaluation | undefined;
}

export interface FindUserByIdRequest {
  userId: number;
}

export interface FindUserByIdResponse {
  data: User | undefined;
}

export interface FetchUsersByIdsRequest {
  userIds: number[];
}

export interface FetchUsersByIdsResponse {
  data: User[];
}

export const MULTI_EVALUATION_V1_PACKAGE_NAME = "multi_evaluation.v1";

export interface MultiEvaluationServiceClient {
  /** MultiTerm */

  fetchMultiTermAll(request: FetchMultiTermAllRequest): Observable<FetchMultiTermAllResponse>;

  /** MultiEvaluation */

  fetchByTermIdAndUserId(request: FetchByTermIdAndUserIdRequst): Observable<FetchByTermIdAndUserIdResponse>;

  submitMultiEvaluation(request: SubmitMultiEvaluationRequest): Observable<SubmitMultiEvaluationResponse>;

  /** User */

  findUserById(request: FindUserByIdRequest): Observable<FindUserByIdResponse>;

  fetchUsersByIds(request: FetchUsersByIdsRequest): Observable<FetchUsersByIdsResponse>;

  /** ReportSetting */

  fetchReportSettingsByTermId(
    request: FetchReportSettingsByTermIdRequest,
  ): Observable<FetchReportSettingsByTermIdResponse>;
}

export interface MultiEvaluationServiceController {
  /** MultiTerm */

  fetchMultiTermAll(
    request: FetchMultiTermAllRequest,
  ): Promise<FetchMultiTermAllResponse> | Observable<FetchMultiTermAllResponse> | FetchMultiTermAllResponse;

  /** MultiEvaluation */

  fetchByTermIdAndUserId(
    request: FetchByTermIdAndUserIdRequst,
  ):
    | Promise<FetchByTermIdAndUserIdResponse>
    | Observable<FetchByTermIdAndUserIdResponse>
    | FetchByTermIdAndUserIdResponse;

  submitMultiEvaluation(
    request: SubmitMultiEvaluationRequest,
  ): Promise<SubmitMultiEvaluationResponse> | Observable<SubmitMultiEvaluationResponse> | SubmitMultiEvaluationResponse;

  /** User */

  findUserById(
    request: FindUserByIdRequest,
  ): Promise<FindUserByIdResponse> | Observable<FindUserByIdResponse> | FindUserByIdResponse;

  fetchUsersByIds(
    request: FetchUsersByIdsRequest,
  ): Promise<FetchUsersByIdsResponse> | Observable<FetchUsersByIdsResponse> | FetchUsersByIdsResponse;

  /** ReportSetting */

  fetchReportSettingsByTermId(
    request: FetchReportSettingsByTermIdRequest,
  ):
    | Promise<FetchReportSettingsByTermIdResponse>
    | Observable<FetchReportSettingsByTermIdResponse>
    | FetchReportSettingsByTermIdResponse;
}

export function MultiEvaluationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "fetchMultiTermAll",
      "fetchByTermIdAndUserId",
      "submitMultiEvaluation",
      "findUserById",
      "fetchUsersByIds",
      "fetchReportSettingsByTermId",
    ];
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
