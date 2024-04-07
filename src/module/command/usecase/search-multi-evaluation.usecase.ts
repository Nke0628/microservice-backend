import { Injectable } from '@nestjs/common';
import { MultiEvaluationRepository } from '../domain/multi-evaluation/infrastructure/multi-evaluation.repository';
import { MultiEvaluationList } from '../domain/multi-evaluation/model/multi-evaluation-list';
import { MultiEvaluationSearchCondition } from '../presentation/search-condition/multi-evaluation-search-condition';

/**
 * 評価を検索する
 */
@Injectable()
export class SearchMultiEvaluationUseCase {
  constructor(
    private readonly multiEvaluationRepository: MultiEvaluationRepository,
  ) {}
  public async execute(
    searchCondition: MultiEvaluationSearchCondition,
  ): Promise<[MultiEvaluationList, number]> {
    // STEP1 評価を取得する
    return await this.multiEvaluationRepository.search(searchCondition);
  }
}
