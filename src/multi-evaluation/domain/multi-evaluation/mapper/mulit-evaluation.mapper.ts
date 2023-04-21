import { MultiEvaluation as MultiEvaluationModel } from '@prisma/client';
import { MultiEvaluation } from '../entitiy/multi-evaluation';

export class MultiEvaluationMapper {
  public static toDomain(
    multiEvaluationModel: MultiEvaluationModel,
  ): MultiEvaluation {
    return new MultiEvaluation(
      multiEvaluationModel.user_id,
      multiEvaluationModel.target_user_id,
      multiEvaluationModel.multi_term_id,
      multiEvaluationModel.score,
      multiEvaluationModel.comment,
      multiEvaluationModel.id,
    );
  }
}
