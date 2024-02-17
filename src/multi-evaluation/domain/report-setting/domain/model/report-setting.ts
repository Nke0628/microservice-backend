import * as dayjs from 'dayjs';
import { PositionLayerType as PositionLayerTypeProto } from 'src/proto/generated/multi_evaluation/v1/multi_evaluation';
import { PositionLayerType } from '../value-object/position-layer-type';
import { ReportSettingDetail } from './report-setting-detail';

export class ReportSetting {
  private reportSettingId?: number;
  private termId: number;
  private saveUserId: number;
  private savedAt: Date;
  private reportSettingDetails: ReportSettingDetail[];

  public constructor(
    termId: number,
    saveUserId: number,
    savedAt: Date,
    reportSettingDetails: ReportSettingDetail[],
    reportSettingId?: number,
  ) {
    this.reportSettingId = reportSettingId;
    this.termId = termId;
    this.saveUserId = saveUserId;
    this.savedAt = savedAt;
    this.reportSettingDetails = reportSettingDetails;
  }

  get getReportSettingId(): number {
    return this.reportSettingId;
  }

  get getTermId(): number {
    return this.termId;
  }

  get getSaveUserId(): number {
    return this.saveUserId;
  }

  get getSavedAt(): Date {
    return this.savedAt;
  }

  get getReportSettingList(): ReportSettingDetail[] {
    return this.reportSettingDetails;
  }

  getFormattedSavedAt(format: string): string {
    const targetDay = dayjs(this.savedAt);
    return targetDay.format(format);
  }

  // レポート設定保存
  sava(
    inputSaveUserId: number,
    inputReportSettingDetails: {
      positionLayerType: PositionLayerTypeProto;
      inputFlg: boolean;
      theme: string;
      charaNum: number;
    }[],
  ): void {
    // 対象役職層のレポート設定の特定
    inputReportSettingDetails.map((inputReportSettingDetail) => {
      const reportSettingDetail = this.reportSettingDetails.find(
        (reportSettingDetail) =>
          inputReportSettingDetail.positionLayerType ===
          reportSettingDetail.getPositionLayerType().getCode,
      );

      // 役職層単位で更新
      reportSettingDetail.save(
        inputReportSettingDetail.positionLayerType,
        inputReportSettingDetail.inputFlg,
        inputReportSettingDetail.theme,
        inputReportSettingDetail.charaNum,
      );

      // レポート設定全体の値更新
      this.saveUserId = inputSaveUserId;
      this.savedAt = new Date();
    });
  }

  // レポート設定初期生成
  static initialCreate(termId: number): ReportSetting {
    const positionLayerTypeList = PositionLayerType.getLayerList();
    const reportSettingDetails = positionLayerTypeList.map((layer) => {
      return new ReportSettingDetail(layer, false, '', 0, 0);
    });
    return new ReportSetting(termId, 0, new Date(), reportSettingDetails, 0);
  }
}
