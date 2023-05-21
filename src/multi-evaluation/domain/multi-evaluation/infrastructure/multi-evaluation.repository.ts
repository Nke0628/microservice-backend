import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { MultiEvaluation } from '../model/multi-evaluation';
import { MultiEvaluationList } from '../model/multi-evaluation-list';
import { MultiEvaluationMapper } from '../mapper/mulit-evaluation.mapper';
import { Optional } from 'typescript-optional';

@Injectable()
export class MultiEvaluationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: number): Promise<Optional<MultiEvaluation>> {
    const multiEvaluationModel =
      await this.prismaService.multiEvaluation.findUnique({
        where: {
          id,
        },
      });
    return Optional.ofNullable(multiEvaluationModel).map((model) =>
      MultiEvaluationMapper.toDomain(model),
    );
  }

  async create(multiEvaluation: MultiEvaluation): Promise<MultiEvaluation> {
    return await this.prismaService.$transaction(async (prisma) => {
      const multiEvaluationModel = await prisma.multiEvaluation.create({
        data: {
          user_id: multiEvaluation.getUserId,
          target_user_id: multiEvaluation.getTargetUserId,
          multi_term_id: multiEvaluation.getMultiTermId,
          score: multiEvaluation.getScore,
          good_comment: multiEvaluation.getGoodComment,
          improvement_comment: multiEvaluation.getImprovementComment,
        },
      });
      return MultiEvaluationMapper.toDomain(multiEvaluationModel);
    });
  }

  async fetchByTermIdAndUserId(
    multiTermId: number,
    userId: number,
  ): Promise<MultiEvaluationList> {
    const multiEvaluationModel =
      await this.prismaService.multiEvaluation.findMany({
        where: {
          multi_term_id: multiTermId,
          user_id: userId,
        },
      });
    return MultiEvaluationMapper.toDomainList(multiEvaluationModel);
  }
}
