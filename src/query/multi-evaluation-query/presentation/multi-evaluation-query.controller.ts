import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FindMultiEvaluationByIdRequest,
  FindMultiEvaluationByIdResponse,
  MultiEvaluationQueryServiceController,
} from 'src/proto/generated/multi_evaluation/v1/multi_evaluation_query';
import { MultiEvaluationQuery } from '../query/multi-evaluation-query';
import { MultiEvaluationQueryMapper } from '../mapper/multi-evaluation-query-mapper';

@Controller('')
export class MultiEvaluationQueryController
  implements MultiEvaluationQueryServiceController
{
  constructor(private readonly multiEvaluationQuery: MultiEvaluationQuery) {}

  @GrpcMethod('MultiEvaluationQueryService')
  async findMultiEvaluationById(
    request: FindMultiEvaluationByIdRequest,
  ): Promise<FindMultiEvaluationByIdResponse> {
    const readModel = await this.multiEvaluationQuery.fetchByTermId(request.id);
    return MultiEvaluationQueryMapper.toProto(readModel);
  }
}
