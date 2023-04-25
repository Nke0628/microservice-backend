import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FetchAllRequest,
  FetchAllResponse,
  FetchByTermIdAndUserIdRequst,
  FetchByTermIdAndUserIdResponse,
  FetchUsersByIdsRequest,
  FetchUsersByIdsResponse,
  FindUserByIdRequest,
  FindUserByIdResponse,
  MultiEvaluationServiceController,
  SubmitMultiEvaluationRequest,
  SubmitMultiEvaluationResponse,
} from 'src/proto/generated/multi_evaluation';
import { UserRepository } from '../domain/user/infrastructure/user.repository';

import { MultiBusinessTermService } from '../service/multi-evaluation.service';

@Controller('')
export class MultiEvaluationController
  implements MultiEvaluationServiceController
{
  constructor(
    private readonly multiTermService: MultiBusinessTermService,
    private readonly userRepository: UserRepository,
  ) {}

  // ユーザ情報取得
  @GrpcMethod('MultiEvaluationService')
  async findUserById(
    request: FindUserByIdRequest,
  ): Promise<FindUserByIdResponse> {
    console.log('hoge');
    const user = await this.userRepository.findById(request.userId);
    return {
      status: HttpStatus.OK,
      error: '',
      data: {
        id: user.getId,
        name: user.getName,
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
      status: HttpStatus.OK,
      error: '',
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
  async fetchAll(request: FetchAllRequest): Promise<FetchAllResponse> {
    const res = await this.multiTermService.fetchAll(request);
    return {
      status: HttpStatus.OK,
      error: '',
      data: res,
    };
  }

  // 期間IDとユーザIDによる360度評価取得(指定ユーザが評価したデータ)
  @GrpcMethod('MultiEvaluationService')
  async fetchByTermIdAndUserId(
    request: FetchByTermIdAndUserIdRequst,
  ): Promise<FetchByTermIdAndUserIdResponse> {
    const response = await this.multiTermService.fetchByTermIdAndUserId(
      request,
    );

    return {
      status: HttpStatus.OK,
      error: '',
      data: response.getList().map((multiEvaluation) => {
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
    await this.multiTermService.subumitMultiEvaluation(request);
    return {
      status: HttpStatus.OK,
      error: '',
    };
  }
}
