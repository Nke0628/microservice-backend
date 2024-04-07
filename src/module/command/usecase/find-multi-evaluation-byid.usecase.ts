import { MultiEvaluationRepository } from '../domain/multi-evaluation/infrastructure/multi-evaluation.repository';

export class findMultiEvaluationById {
  private constructor(
    private readonly multiEvaluationRepository: MultiEvaluationRepository,
  ) {}
  public execute(id: number) {
    const multiEvaluation = this.multiEvaluationRepository.find(id);
    // return multiEvaluation.of();
  }
}
