import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { MultiEvaluation } from '../entitiy/multi-evaluation';
import { MultiEvaluationMapper } from '../mapper/mulit-evaluation.mapper';

@Injectable()
export class MultiEvaluationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(multiEvaluation: MultiEvaluation): Promise<MultiEvaluation> {
    return await this.prismaService.$transaction(async (prisma) => {
      const multiEvaluationModel = await prisma.multiEvaluation.create({
        data: {
          user_id: multiEvaluation.getUserId,
          target_user_id: multiEvaluation.getTargetUserId,
          multi_term_id: multiEvaluation.getMultiTermId,
          score: multiEvaluation.getScore,
          comment: multiEvaluation.getComment,
        },
      });
      return MultiEvaluationMapper.toDomain(multiEvaluationModel);
    });
  }
}
