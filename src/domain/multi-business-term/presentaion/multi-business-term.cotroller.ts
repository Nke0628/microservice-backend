import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FetchAllRequest,
  FetchAllResponse,
  MultiEvaluationServiceController,
} from 'src/proto/generated/multi_evaluation';

import { MultiBusinessTermRepository } from '../infrastructure/multi-business-term.respository';

@Controller('')
export class MultiBusinessTermController
  implements MultiEvaluationServiceController
{
  constructor(
    private readonly multiTermRepository: MultiBusinessTermRepository,
  ) {}
  @GrpcMethod('MultiEvaluationService')
  async fetchAll(arg: FetchAllRequest): Promise<FetchAllResponse> {
    const responese = await this.multiTermRepository.fetchAll(arg);
    const ret = [];
    responese.getList().map((data) => {
      const temp = {
        id: data.getId,
        businessTermName: data.getBusinessTermName,
        businessTermStartDate: data.getBusinessTermStartDate.toLocaleString(),
        businessTermEndDate: data.getBusinessTermEndDate.toString(),
        multiTermStartDate: data.getMultiTermStartDate.toString(),
        multiTermEndDate: data.getMultiTermEndDate.toString(),
      };
      ret.push(temp);
    });
    return { multiBusinessTermList: ret };
  }
}
