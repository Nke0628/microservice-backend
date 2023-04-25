import { MultiEvaluation as MultiEvaluationModel } from '@prisma/client';
import { MultiEvaluation } from '../entitiy/multi-evaluation';
import { MultiEvaluationList } from '../entitiy/multi-evaluation-list';

export class MultiEvaluationMapper {
  public static toDomain(
    multiEvaluationModel: MultiEvaluationModel,
  ): MultiEvaluation {
    return new MultiEvaluation(
      multiEvaluationModel.user_id,
      multiEvaluationModel.target_user_id,
      multiEvaluationModel.multi_term_id,
      multiEvaluationModel.score,
      multiEvaluationModel.good_comment,
      multiEvaluationModel.improvement_comment,
      multiEvaluationModel.id,
    );
  }

  public static toDomainList(multiEvaluationModelList: MultiEvaluationModel[]) {
    return new MultiEvaluationList(
      multiEvaluationModelList.map((multiEvaluationModel) => {
        return this.toDomain(multiEvaluationModel);
      }),
    );
  }
}
