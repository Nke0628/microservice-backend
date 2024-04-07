import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { Optional } from 'typescript-optional';
import { ManagerNormaApplyMapper } from '../mapper/manager-norma-apply.mapper';
import { ManagerNormaApply } from '../model/manager-norma-apply';

@Injectable()
export class ManagerNormaApplyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserIdAndMultiTermId(
    userId: number,
    mulitNormId: number,
  ): Promise<Optional<ManagerNormaApply>> {
    const managerNormaApplyModel =
      await this.prismaService.managerNormApply.findFirst({
        where: {
          user_id: userId,
          multi_term_id: mulitNormId,
        },
      });
    return Optional.ofNullable(managerNormaApplyModel).map((model) =>
      ManagerNormaApplyMapper.toDomain(model),
    );
  }
}
