import { PositionLayerType } from '../value-object/position-layer-type';

export class ReportSettingDetail {
  private reportSettingDetailId?: number;
  private positionPositionLayerTypeType: PositionLayerType;
  private inputFlg: boolean;
  private theme: string;
  private charaNum: number;

  public constructor(
    positionPositionLayerTypeType: PositionLayerType,
    inputFlg: boolean,
    theme: string,
    charaNum: number,
    reportSettingDetailId?: number,
  ) {
    this.reportSettingDetailId = reportSettingDetailId;
    this.positionPositionLayerTypeType = positionPositionLayerTypeType;
    this.inputFlg = inputFlg;
    this.theme = theme;
    this.charaNum = charaNum;
  }

  get getReportSettingDetailId(): number {
    return this.reportSettingDetailId;
  }

  getPositionLayerType(): PositionLayerType {
    return this.positionPositionLayerTypeType;
  }

  get getInputFlg(): boolean {
    return this.inputFlg;
  }

  get getTheme(): string {
    return this.theme;
  }

  get getCharaNum(): number {
    return this.charaNum;
  }
}
