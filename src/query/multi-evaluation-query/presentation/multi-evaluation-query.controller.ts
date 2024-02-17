import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FindMultiEvaluationByIdRequest,
  FindMultiEvaluationByIdResponse,
  MultiEvaluationQueryServiceController,
} from 'src/proto/generated/multi_evaluation/v1/multi_evaluation_query';

@Controller('')
export class MultiEvaluationQueryController
  implements MultiEvaluationQueryServiceController
{
  @GrpcMethod('MultiEvaluationQueryService')
  findMultiEvaluationById(
    request: FindMultiEvaluationByIdRequest,
  ): Promise<FindMultiEvaluationByIdResponse> {
    throw new NotFoundException();
  }
}
