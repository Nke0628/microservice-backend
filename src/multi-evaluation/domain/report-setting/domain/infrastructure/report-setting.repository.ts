import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { Prisma } from '@prisma/client';
import { ReportSetting } from '../model/report-setting';
import { ReportSettingMapper } from '../mapper/report-setting.mapper';

export type ReportSettingWithDetailEntitiy = Prisma.ReportSettingGetPayload<{
  include: { ReportSettingDetail: true };
}>;

@Injectable()
export class ReportSettingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchByTermId(termId: number): Promise<ReportSetting> {
    const reportSettingwithDetailEntities =
      await this.prismaService.reportSetting.findFirst({
        where: {
          term_id: termId,
        },
        include: {
          ReportSettingDetail: true,
        },
      });
    return ReportSettingMapper.toDomainList(reportSettingwithDetailEntities);
  }
}
