import { Injectable } from '@nestjs/common';
import {
  FetchAllRequest,
  FetchByTermIdAndUserIdRequst,
  MultiBusinessTerm,
  SubmitMultiEvaluationRequest,
} from 'src/proto/generated/multi_evaluation';
import { MultiBusinessTermRepository } from '../domain/multi-business-term/infrastructure/multi-business-term.respository';
import { MultiEvaluation } from '../domain/multi-evaluation/entitiy/multi-evaluation';
import { MultiEvaluationList } from '../domain/multi-evaluation/entitiy/multi-evaluation-list';
import { MultiEvaluationRepository } from '../domain/multi-evaluation/infrastructure/multi-evaluation.repository';

@Injectable()
export class MultiBusinessTermService {
  constructor(
    private readonly multiTermRepository: MultiBusinessTermRepository,
    private readonly multiEvaluationRepository: MultiEvaluationRepository,
  ) {}
  async fetchAll(arg: FetchAllRequest): Promise<MultiBusinessTerm[]> {
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
        isCurrentTerm: data.isCurrentTerm(),
      };
      ret.push(temp);
    });
    return ret;
  }

  async fetchByTermIdAndUserId(
    request: FetchByTermIdAndUserIdRequst,
  ): Promise<MultiEvaluationList> {
    return await this.multiEvaluationRepository.fetchByTermIdAndUserId(
      request.termid,
      request.userId,
    );
  }

  async subumitMultiEvaluation(
    request: SubmitMultiEvaluationRequest,
  ): Promise<void> {
    const multiEvaluation = MultiEvaluation.newCreate();
    multiEvaluation.submit(
      request.userId,
      request.targetUserId,
      request.multiTermId,
      request.score,
      request.comment,
    );
    this.multiEvaluationRepository.create(multiEvaluation);
  }
}
