import { Injectable } from '@nestjs/common';
import { ManagerNormaApplyRepository } from '../domain/norma-apply/infrastructure/manager-norma-apply.repository';
import { ManagerNormaApply } from '../domain/norma-apply/model/manager-norma-apply';

@Injectable()
export class FindManagerNormaApplyByUserIdAndMultiTermIdUseCase {
  public constructor(
    private readonly managerNormaApplyRepository: ManagerNormaApplyRepository,
  ) {}
  public async execute(
    userId: number,
    multiTermId: number,
  ): Promise<ManagerNormaApply> {
    // Step1 管理職ノルマ免除申請の取得
    const managerNormaApply =
      await this.managerNormaApplyRepository.findByUserIdAndMultiTermId(
        userId,
        multiTermId,
      );

    return managerNormaApply.orElse(
      ManagerNormaApply.initialCreate(userId, multiTermId),
    );
  }
}
