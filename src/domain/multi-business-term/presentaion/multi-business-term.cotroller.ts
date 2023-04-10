import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FetchAllRequest,
  FetchAllResponse,
  MultiEvaluationServiceController,
} from 'src/proto/generated/multi_evaluation';

import { MultiBusinessTermService } from '../service/multi-business-term.service';

@Controller('')
export class MultiBusinessTermController
  implements MultiEvaluationServiceController
{
  constructor(private readonly multiTermService: MultiBusinessTermService) {}
  @GrpcMethod('MultiEvaluationService')
  async fetchAll(arg: FetchAllRequest): Promise<FetchAllResponse> {
    const res = await this.multiTermService.fetchAll(arg);
    return {
      status: HttpStatus.OK,
      error: '',
      multiBusinessTermList: res,
    };
  }
}
