import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  EvaluationServiceController,
  FetchAllRequest,
  FetchAllResponse,
  FindByIdRequest,
  FindByIdResponse,
  MultiBusinessTerm,
} from 'src/proto/generated/multiBusinessTerm';
import { MultiBusinessTermRepository } from '../infrastructure/multiBusinessTerm.respository';

@Controller('')
export class MultiBusinessTermController
  implements EvaluationServiceController
{
  constructor(
    private readonly multiTermRepository: MultiBusinessTermRepository,
  ) {}
  @GrpcMethod('EvaluationService')
  findById(request: FindByIdRequest): Promise<FindByIdResponse> {
    throw new Error('Method not implemented.');
  }
  @GrpcMethod('EvaluationService')
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
    return { multiBusinessTerm: ret };
  }
}
