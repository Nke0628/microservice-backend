import { MultiEvaluation } from '@prisma/client';
import { FindMultiEvaluationByIdResponse } from 'src/proto/generated/multi_evaluation/v1/multi_evaluation_query';

export class MultiEvaluationQueryMapper {
  public static toProto(
    multiEvaluation: MultiEvaluation,
  ): FindMultiEvaluationByIdResponse {
    return {
      id: multiEvaluation.id,
      userId: multiEvaluation.user_id,
      targetUserId: multiEvaluation.target_user_id,
      multiTermId: multiEvaluation.multi_term_id,
      score: multiEvaluation.score,
      goodComment: multiEvaluation.good_comment,
      improvementComment: multiEvaluation.improvement_comment,
      createdAt: multiEvaluation.created_at.toDateString(),
      updatedAt: multiEvaluation.updated_at.toDateString(),
    };
  }
}
