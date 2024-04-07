/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'microservice_backend.v1';

export enum ApplyStatus {
  UNAPPLIED = 0,
  APPLYING = 1,
  APPROVE = 2,
  REMAND = 3,
  EXEMPTION = 4,
  UNRECOGNIZED = -1,
}

export enum PositionLayerType {
  UNSPECIFIED = 0,
  SECTION = 1,
  EGG_ASISTANT = 2,
  EGG_GENERAL = 3,
  GENERAL = 4,
  LEADER = 5,
  SUB_CHEIF = 6,
  UNRECOGNIZED = -1,
}

/** レポート提出状況 */
export enum ReportSubmitStatus {
  REPORT_SUBMIT_STATUS_UNSPECIFIED = 0,
  UNSUBMITTED = 1,
  ACCEPTED = 2,
  DECLINED = 3,
  UNRECOGNIZED = -1,
}

/** レポート認可状況 */
export enum ReportResultStatus {
  REPORT_RESULT_UNSPECIFIED = 0,
  APPROVED = 1,
  REJECTED = 2,
  UNRECOGNIZED = -1,
}

export interface FindManagerNormaApplyRequest {
  userId: number;
  multiTermId: number;
}

export interface FindManagerNormaApplyResponse {
  id: number;
  multiTermId: number;
  reason: string;
  exemptionCount: number;
  applyStatus: ApplyStatus;
  remandReason: string;
}

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
  positionLayerType: PositionLayerType;
  inputFlg: boolean;
  theme: string;
  charaNum: number;
}

export interface FetchReportSettingsByTermIdResponse {
  data: ReportSetting | undefined;
}

export interface RegisterReportSettingDetail {
  positionLayerType: PositionLayerType;
  inputFlg: boolean;
  theme: string;
  charaNum: number;
}

export interface RegisterReportSettingsRequest {
  userId: number;
  termId: number;
  reportSettingDetails: RegisterReportSettingDetail[];
}

export interface RegisterReportSettingsResponse {
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

/** 評価検索リクエスト */
export interface SearchMultiEvaluationRequest {
  termId: number;
  userIdList: number[];
  reportSubmitStatusList: ReportSubmitStatus[];
  reportResultStatusList: ReportResultStatus[];
  limit: number;
  page: number;
}

/** 評価検索レスポンス */
export interface SearchMultiEvaluationResponse {
  totalCount: number;
  data: MultiEvaluation[];
}

export const MICROSERVICE_BACKEND_V1_PACKAGE_NAME = 'microservice_backend.v1';

export interface MultiEvaluationServiceClient {
  /** MultiTerm */

  fetchMultiTermAll(
    request: FetchMultiTermAllRequest,
  ): Observable<FetchMultiTermAllResponse>;

  /** MultiEvaluation */

  fetchByTermIdAndUserId(
    request: FetchByTermIdAndUserIdRequst,
  ): Observable<FetchByTermIdAndUserIdResponse>;

  searchMultiEvaluation(
    request: SearchMultiEvaluationRequest,
  ): Observable<SearchMultiEvaluationResponse>;

  submitMultiEvaluation(
    request: SubmitMultiEvaluationRequest,
  ): Observable<SubmitMultiEvaluationResponse>;

  /** User */

  findUserById(request: FindUserByIdRequest): Observable<FindUserByIdResponse>;

  fetchUsersByIds(
    request: FetchUsersByIdsRequest,
  ): Observable<FetchUsersByIdsResponse>;

  /** NormaApply */

  findManagerNormaApplyByUserIdAndTermId(
    request: FindManagerNormaApplyRequest,
  ): Observable<FindManagerNormaApplyResponse>;

  /** ReportSetting */

  fetchReportSettingsByTermId(
    request: FetchReportSettingsByTermIdRequest,
  ): Observable<FetchReportSettingsByTermIdResponse>;

  registerReportSettings(
    request: RegisterReportSettingsRequest,
  ): Observable<RegisterReportSettingsResponse>;
}

export interface MultiEvaluationServiceController {
  /** MultiTerm */

  fetchMultiTermAll(
    request: FetchMultiTermAllRequest,
  ):
    | Promise<FetchMultiTermAllResponse>
    | Observable<FetchMultiTermAllResponse>
    | FetchMultiTermAllResponse;

  /** MultiEvaluation */

  fetchByTermIdAndUserId(
    request: FetchByTermIdAndUserIdRequst,
  ):
    | Promise<FetchByTermIdAndUserIdResponse>
    | Observable<FetchByTermIdAndUserIdResponse>
    | FetchByTermIdAndUserIdResponse;

  searchMultiEvaluation(
    request: SearchMultiEvaluationRequest,
  ):
    | Promise<SearchMultiEvaluationResponse>
    | Observable<SearchMultiEvaluationResponse>
    | SearchMultiEvaluationResponse;

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

  /** NormaApply */

  findManagerNormaApplyByUserIdAndTermId(
    request: FindManagerNormaApplyRequest,
  ):
    | Promise<FindManagerNormaApplyResponse>
    | Observable<FindManagerNormaApplyResponse>
    | FindManagerNormaApplyResponse;

  /** ReportSetting */

  fetchReportSettingsByTermId(
    request: FetchReportSettingsByTermIdRequest,
  ):
    | Promise<FetchReportSettingsByTermIdResponse>
    | Observable<FetchReportSettingsByTermIdResponse>
    | FetchReportSettingsByTermIdResponse;

  registerReportSettings(
    request: RegisterReportSettingsRequest,
  ):
    | Promise<RegisterReportSettingsResponse>
    | Observable<RegisterReportSettingsResponse>
    | RegisterReportSettingsResponse;
}

export function MultiEvaluationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'fetchMultiTermAll',
      'fetchByTermIdAndUserId',
      'searchMultiEvaluation',
      'submitMultiEvaluation',
      'findUserById',
      'fetchUsersByIds',
      'findManagerNormaApplyByUserIdAndTermId',
      'fetchReportSettingsByTermId',
      'registerReportSettings',
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
