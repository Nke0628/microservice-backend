import { Prisma } from '@prisma/client';

export type ReportSettingWithDetailEntitiy = Prisma.ReportSettingGetPayload<{
  include: { ReportSettingDetail: true };
}>;
