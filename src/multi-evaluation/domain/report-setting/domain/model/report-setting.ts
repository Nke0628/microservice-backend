import * as dayjs from 'dayjs';
import { ReportSettingDetail } from './report-setting-detail';

export class ReportSetting {
  private reportSettingId: number;
  private saveUserId: number;
  private savedAt: Date;
  private reportSetiingList: ReportSettingDetail[];

  public constructor(
    reportSettingId: number,
    saveUserId: number,
    savedAt: Date,
    reportSetting: ReportSettingDetail[],
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
}
