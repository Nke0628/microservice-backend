import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FetchByTermIdAndUserIdRequst,
  FetchByTermIdAndUserIdResponse,
  FetchMultiTermAllRequest,
  FetchMultiTermAllResponse,
  FetchReportSettingsByTermIdRequest,
  FetchReportSettingsByTermIdResponse,
  FetchUsersByIdsRequest,
  FetchUsersByIdsResponse,
  FindUserByIdRequest,
  FindUserByIdResponse,
  MultiEvaluationServiceController,
  SubmitMultiEvaluationRequest,
  SubmitMultiEvaluationResponse,
} from 'src/proto/generated/multi_evaluation';
import { MultiEvaluation } from '../domain/multi-evaluation/model/multi-evaluation';
import { MultiEvaluationRepository } from '../domain/multi-evaluation/infrastructure/multi-evaluation.repository';
import { MultiTermRepository } from '../domain/multi-term/infrastructure/multi-term.respository';
import { UserRepository } from '../domain/user/infrastructure/user.repository';
import { ReportSettingRepository } from '../domain/report-setting/domain/infrastructure/report-setting.repository';

@Controller('')
export class MultiEvaluationController
  implements MultiEvaluationServiceController
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly multiTermRepository: MultiTermRepository,
    private readonly multiEvaluationRepository: MultiEvaluationRepository,
    private readonly reportSettingRepository: ReportSettingRepository,
  ) {}

  @GrpcMethod('MultiEvaluationService')
  async fetchReportSettingsByTermId(
    request: FetchReportSettingsByTermIdRequest,
  ): Promise<FetchReportSettingsByTermIdResponse> {
    const reportSetting = await this.reportSettingRepository.fetchByTermId(
      request.termId,
    );
    return {
      data: {
        reportSettingId: reportSetting.getReportSettingId,
        saveUserId: reportSetting.getSaveUserId,
        savedAt: reportSetting.getFormattedSavedAt('YYYY-MM-DD HH:MM:ss'),
        reportSettingDetails: reportSetting.getReportSettingList.map(
          (reportSettingDetail) => {
            return {
              reportSettingDetailId:
                reportSettingDetail.getReportSettingDetailId,
              positionLayerType: reportSettingDetail.getPositionLayerType(),
              positionLayerName: reportSettingDetail.getPositionLayerName(),
              inputFlg: reportSettingDetail.getInputFlg,
              theme: reportSettingDetail.getTheme,
              charaNum: reportSettingDetail.getCharaNum,
            };
          },
        ),
      },
    };
  }

  // ユーザ情報取得
  @GrpcMethod('MultiEvaluationService')
  async findUserById(
    request: FindUserByIdRequest,
  ): Promise<FindUserByIdResponse> {
    const user = await this.userRepository.findById(request.userId);
    return {
      data: {
        id: user.map((user) => user.getId).orElse(0),
        name: user.map((user) => user.getName).orElse(''),
      },
    };
  }

  // ユーザ情報リスト取得
  @GrpcMethod('MultiEvaluationService')
  async fetchUsersByIds(
    request: FetchUsersByIdsRequest,
  ): Promise<FetchUsersByIdsResponse> {
    const userList = await this.userRepository.fechtByIds(request.userIds);
    return {
      data: userList.getList.map((user) => {
        return {
          id: user.getId,
          name: user.getName,
        };
      }),
    };
  }

  // 360度評価期間全取得
  @GrpcMethod('MultiEvaluationService')
  async fetchMultiTermAll(
    request: FetchMultiTermAllRequest,
  ): Promise<FetchMultiTermAllResponse> {
    const multiTermList = await this.multiTermRepository.fetchAll(
      request.take,
      request.orderBy,
    );
    return {
      data: multiTermList.getList().map((data) => {
        return {
          id: data.getId,
          businessTermName: data.getBusinessTermName,
          businessTermStartDate: data.getBusinessTermStartDate.toLocaleString(),
          businessTermEndDate: data.getBusinessTermEndDate.toString(),
          multiTermStartDate: data.getMultiTermStartDate.toString(),
          multiTermEndDate: data.getMultiTermEndDate.toString(),
          isCurrentTerm: data.isCurrentTerm(),
        };
      }),
    };
  }

  // 期間IDとユーザIDによる360度評価取得(指定ユーザが評価したデータ)
  @GrpcMethod('MultiEvaluationService')
  async fetchByTermIdAndUserId(
    request: FetchByTermIdAndUserIdRequst,
  ): Promise<FetchByTermIdAndUserIdResponse> {
    let targetTermId = request.termId;
    if (targetTermId === 0) {
      const multiEvaluationList = await this.multiTermRepository.fetchAll(
        100,
        true,
      );
      const currentTerm = multiEvaluationList.getCurrentTerm();
      targetTermId = currentTerm.map((multiTerm) => multiTerm.getId).orElse(0);
    }
    const multiEvaluationList =
      await this.multiEvaluationRepository.fetchByTermIdAndUserId(
        targetTermId,
        request.userId,
      );
    return {
      data: multiEvaluationList.getList().map((multiEvaluation) => {
        return {
          id: multiEvaluation.getId,
          userId: multiEvaluation.getUserId,
          targetUserId: multiEvaluation.getTargetUserId,
          multiTermId: multiEvaluation.getMultiTermId,
          score: multiEvaluation.getScore,
          goodComment: multiEvaluation.getGoodComment,
          improvementComment: multiEvaluation.getImprovementComment,
        };
      }),
    };
  }

  // 360度評価提出
  @GrpcMethod('MultiEvaluationService')
  async submitMultiEvaluation(
    request: SubmitMultiEvaluationRequest,
  ): Promise<SubmitMultiEvaluationResponse> {
    const multiEvaluation = MultiEvaluation.newCreate();
    multiEvaluation.submit(
      request.userId,
      request.targetUserId,
      request.multiTermId,
      request.score,
      request.goodComment,
      request.improvementComment,
    );
    const submittedMultiEvaluation =
      await this.multiEvaluationRepository.create(multiEvaluation);
    return {
      data: {
        id: submittedMultiEvaluation.getId,
        userId: submittedMultiEvaluation.getUserId,
        targetUserId: submittedMultiEvaluation.getTargetUserId,
        multiTermId: submittedMultiEvaluation.getMultiTermId,
        score: submittedMultiEvaluation.getScore,
        goodComment: submittedMultiEvaluation.getGoodComment,
        improvementComment: submittedMultiEvaluation.getImprovementComment,
      },
    };
  }
}
