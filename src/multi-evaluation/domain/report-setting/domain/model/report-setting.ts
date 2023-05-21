import * as dayjs from 'dayjs';
import { PositonLayerType } from '../value-object/positoy-layer-type';
import { ReportSettingDetail } from './report-setting-detail';

export class ReportSetting {
  private reportSettingId?: number;
  private saveUserId: number;
  private savedAt: Date;
  private reportSetiingList: ReportSettingDetail[];

  public constructor(
    saveUserId: number,
    savedAt: Date,
    reportSetting: ReportSettingDetail[],
    reportSettingId?: number,
  ) {
    this.reportSettingId = reportSettingId;
    this.saveUserId = saveUserId;
    this.savedAt = savedAt;
    this.reportSetiingList = reportSetting;
  }

  get getReportSettingId(): number {
    return this.reportSettingId;
  }

  get getSaveUserId(): number {
    return this.saveUserId;
  }

  get getSavedAt(): Date {
    return this.savedAt;
  }

  get getReportSettingList(): ReportSettingDetail[] {
    return this.reportSetiingList;
  }

  getFormattedSavedAt(format: string): string {
    const targetDay = dayjs(this.savedAt);
    return targetDay.format(format);
  }

  static initialCreate(): ReportSetting {
    const positionLayerTypeList = Object.values(PositonLayerType).filter(
      (v) => !isNaN(Number(v)),
    );
    const reportSettingDetails = positionLayerTypeList.map((value) => {
      return new ReportSettingDetail(Number(value), false, '', 0, 0);
    });
    return new ReportSetting(0, new Date(), reportSettingDetails, 0);
  }
}
