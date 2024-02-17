import { Injectable, NotFoundException } from '@nestjs/common';
import { MultiEvaluation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prsima.service';

@Injectable()
export class MultiEvaluationQuery {
  constructor(private readonly prismaService: PrismaService) {}

  /** IDによる360度評価取得 */
  async fetchByTermId(id: number): Promise<MultiEvaluation> {
    const readModel = await this.prismaService.multiEvaluation.findFirst({
      where: {
        id,
      },
    });
    if (!readModel) {
      throw new NotFoundException(`対象の360度評価はありません。id: ${id}`);
    }
    return readModel;
  }
}
