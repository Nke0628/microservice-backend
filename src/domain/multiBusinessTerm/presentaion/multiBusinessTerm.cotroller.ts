import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FindByIdRequest,
  FindByIdResponse,
  FetchAllRequest,
  FetchAllResponse,
  MultiEvaluationServiceController,
} from 'src/proto/generated/multi_evaluation';

import { MultiBusinessTermRepository } from '../infrastructure/multiBusinessTerm.respository';

@Controller('')
export class MultiBusinessTermController
  implements MultiEvaluationServiceController
{
  constructor(
    private readonly multiTermRepository: MultiBusinessTermRepository,
  ) {}
  @GrpcMethod('MultiEvaluationService')
  findById(request: FindByIdRequest): Promise<FindByIdResponse> {
    throw new Error('Method not implemented.');
  }
  @GrpcMethod('MultiEvaluationService')
  async fetchAll(request: FetchAllRequest): Promise<FetchAllResponse> {
    const responese = await this.multiTermRepository.fetchAll();
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
