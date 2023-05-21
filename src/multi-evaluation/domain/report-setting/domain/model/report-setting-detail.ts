import { PositonLayerType } from '../value-object/positoy-layer-type';
import { match } from 'ts-pattern';

export class ReportSettingDetail {
  private reportSettingDetailId?: number;
  private positionLayerType: PositonLayerType;
  private inputFlg: boolean;
  private theme: string;
  private charaNum: number;

  public constructor(
    positionLayerType: PositonLayerType,
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

  getPositionLayerName(): string {
    return match(this.positionLayerType)
      .with(PositonLayerType.SECTION, () => 'セクション')
      .with(PositonLayerType.EGG_ASSISTANT, () => 'EGGアシスタント')
      .with(PositonLayerType.EGG_GENERAL, () => 'EGG一般')
      .with(PositonLayerType.GENERAL, () => '一般')
      .with(PositonLayerType.LEADER, () => 'リーダー')
      .with(PositonLayerType.SUB_CHIEF, () => 'サブチーフ')
      .with(PositonLayerType.CHIEF, () => 'チーフ')
      .otherwise(() => '');
  }

  getPositionLayerType(): number {
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
