import { ManagerNormApply as ManagerNormaApplyModel } from '@prisma/client';
import { ManagerNormaApply } from '../model/manager-norma-apply';
import { ApplyStatus } from '../value-objet/apply-status';

export class ManagerNormaApplyMapper {
  public static toDomain(
    managerNormaApplyModel: ManagerNormaApplyModel,
  ): ManagerNormaApply {
    return new ManagerNormaApply(
      managerNormaApplyModel.user_id,
      managerNormaApplyModel.multi_term_id,
      managerNormaApplyModel.reason,
      managerNormaApplyModel.exemption_count,
      ApplyStatus.fromCode(managerNormaApplyModel.apply_status),
      managerNormaApplyModel.reason,
      managerNormaApplyModel.id,
    );
  }
}
