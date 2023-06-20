import { RpcException } from '@nestjs/microservices';
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

  get getInputFlg(): boolean {
    return this.inputFlg;
  }

  get getTheme(): string {
    return this.theme;
  }

  get getCharaNum(): number {
    return this.charaNum;
  }

  getPositionLayerType(): PositionLayerType {
    return this.positionPositionLayerTypeType;
  }

  save(
    positionLayerType: number,
    inputFlg: boolean,
    theme: string,
    charaNum: number,
  ): void {
    if ((inputFlg && !theme) || (inputFlg && !charaNum)) {
      throw new RpcException('入力有の場合は。テーマと文字数が必須です');
    }
    this.positionPositionLayerTypeType =
      PositionLayerType.fromCode(positionLayerType);
    this.inputFlg = inputFlg;
    this.theme = theme;
    this.charaNum = charaNum;
  }
}
