import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FetchAllRequest,
  FetchAllResponse,
  MultiEvaluationServiceController,
  SubmitMultiEvaluationRequest,
  SubmitMultiEvaluationResponse,
} from 'src/proto/generated/multi_evaluation';

import { MultiBusinessTermService } from '../service/multi-evaluation.service';

@Controller('')
export class MultiEvaluationController
  implements MultiEvaluationServiceController
{
  constructor(private readonly multiTermService: MultiBusinessTermService) {}

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
