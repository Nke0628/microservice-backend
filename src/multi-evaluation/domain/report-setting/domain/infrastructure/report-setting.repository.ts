import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { ReportSetting } from '../model/report-setting';
import { ReportSettingMapper } from '../mapper/report-setting.mapper';

@Injectable()
export class ReportSettingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchByTermId(termId: number): Promise<ReportSetting | null> {
    const reportSettingwithDetailEntities =
      await this.prismaService.reportSetting.findFirst({
        where: {
          term_id: termId,
        },
        include: {
          ReportSettingDetail: true,
        },
      });
    if (!reportSettingwithDetailEntities) {
      return null;
    }
    return ReportSettingMapper.toDomainList(reportSettingwithDetailEntities);
  }

  async save(reportSetting: ReportSetting): Promise<void> {
    return await this.prismaService.$transaction(async (prisma) => {
      // reportSettingの追加更新
      const reportSettingEntity = await prisma.reportSetting.upsert({
        where: {
          id: reportSetting.getReportSettingId,
        },
        create: {
          term_id: reportSetting.getTermId,
          save_user_id: reportSetting.getSaveUserId,
          saved_at: reportSetting.getSavedAt,
        },
        update: {
          term_id: reportSetting.getTermId,
          save_user_id: reportSetting.getSaveUserId,
          saved_at: reportSetting.getSavedAt,
        },
      });

      // reportSettingDetailの削除
      await prisma.reportSettingDetail.deleteMany({
        where: {
          report_setting_id: reportSettingEntity.id,
        },
      });

      // reportSettingDetailの登録
      await prisma.reportSettingDetail.createMany({
        data: reportSetting.getReportSettingList.map((reportSettingDetail) => {
          return {
            report_setting_id: reportSettingEntity.id,
            postioin_layer_type:
              reportSettingDetail.getPositionLayerType().getCode,
            input_flg: reportSettingDetail.getInputFlg,
            theme: reportSettingDetail.getTheme,
            chara_num: reportSettingDetail.getCharaNum,
          };
        }),
      });
    });
  }
}
