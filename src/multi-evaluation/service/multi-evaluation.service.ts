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
export class MultiEvaluationService {
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
    let temrId = request.termid;
    if (temrId === 0) {
      const multiEvaluationList = await this.multiTermRepository.fetchAll({
        take: 100,
        orderBy: true,
      });
      const currentTerm = multiEvaluationList.getCurrentTerm();
      temrId = currentTerm.getId;
    }

    return await this.multiEvaluationRepository.fetchByTermIdAndUserId(
      temrId,
      request.userId,
    );
  }

  async subumitMultiEvaluation(
    request: SubmitMultiEvaluationRequest,
  ): Promise<MultiEvaluation> {
    const multiEvaluation = MultiEvaluation.newCreate();
    multiEvaluation.submit(
      request.userId,
      request.targetUserId,
      request.multiTermId,
      request.score,
      request.goodComment,
      request.improvementComment,
    );
    return this.multiEvaluationRepository.create(multiEvaluation);
  }
}
