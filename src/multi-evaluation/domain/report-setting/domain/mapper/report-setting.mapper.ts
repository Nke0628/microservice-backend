import { ReportSettingDetail as ReportSettingDetailEntity } from '@prisma/client';
import { ReportSettingWithDetailEntitiy } from '../infrastructure/report-setting.repository';
import { ReportSettingDetail } from '../model/report-setting-detail';
import { ReportSetting } from '../model/report-setting';

export class ReportSettingMapper {
  public static toDomain(
    ReportSettingDetailEntity: ReportSettingDetailEntity,
  ): ReportSettingDetail {
    return new ReportSettingDetail(
      ReportSettingDetailEntity.postioin_layer_type,
      ReportSettingDetailEntity.input_flg,
      ReportSettingDetailEntity.theme,
      ReportSettingDetailEntity.chara_num,
      ReportSettingDetailEntity.id,
    );
  }

  public static toDomainList(
    reportSettingWithDetailEntity: ReportSettingWithDetailEntitiy,
  ): ReportSetting {
    const reportSettingList =
      reportSettingWithDetailEntity.ReportSettingDetail.map(
        (ReportSettingDetailEntitiy) => {
          return this.toDomain(ReportSettingDetailEntitiy);
        },
      );
    return new ReportSetting(
      reportSettingWithDetailEntity.save_user_id,
      reportSettingWithDetailEntity.saved_at,
      reportSettingList,
      reportSettingWithDetailEntity.id,
    );
  }
}
