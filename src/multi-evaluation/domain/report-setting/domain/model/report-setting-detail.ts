import { Layer } from '../value-object/layer';

export class ReportSettingDetail {
  private reportSettingDetailId?: number;
  private positionLayerType: Layer;
  private inputFlg: boolean;
  private theme: string;
  private charaNum: number;

  public constructor(
    positionLayerType: Layer,
    inputFlg: boolean,
    theme: string,
    charaNum: number,
    reportSettingDetailId?: number,
  ) {
    this.reportSettingDetailId = reportSettingDetailId;
    this.positionLayerType = positionLayerType;
    this.inputFlg = inputFlg;
    this.theme = theme;
    this.charaNum = charaNum;
  }

  get getReportSettingDetailId(): number {
    return this.reportSettingDetailId;
  }

  getPositionLayerType(): Layer {
    return this.positionLayerType;
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
