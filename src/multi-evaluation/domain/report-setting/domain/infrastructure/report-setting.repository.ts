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
}
