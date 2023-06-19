type PositionLayerTypeCode = 1 | 2 | 3 | 4 | 5 | 6;

export class PositionLayerType {
  private static readonly _values: PositionLayerType[] = [];

  static readonly SECTION = new PositionLayerType('セクション層', 1);
  static readonly EGG_ASISTANT = new PositionLayerType('EGGアシスタント層', 2);
  static readonly EGG_GENERAL = new PositionLayerType('EGG一般層', 3);
  static readonly GENERAL = new PositionLayerType('一般層', 4);
  static readonly LEADER = new PositionLayerType('リーダー層', 5);
  static readonly SUB_CHEIF = new PositionLayerType('サブチーフ層', 6);

  private constructor(
    readonly name: string,
    readonly code: PositionLayerTypeCode,
  ) {
    PositionLayerType._values.push(this);
  }

  static fromCode(code: number): PositionLayerType {
    return PositionLayerType._values.find((x) => x.code === code);
  }

  get getName(): string {
    return this.name;
  }

  get getCode(): number {
    return this.code;
  }

  // TODO プロパティから生成したい
  static getLayerList(): PositionLayerType[] {
    return [
      PositionLayerType.SECTION,
      PositionLayerType.EGG_ASISTANT,
      PositionLayerType.EGG_GENERAL,
      PositionLayerType.GENERAL,
      PositionLayerType.LEADER,
      PositionLayerType.SUB_CHEIF,
    ];
  }
}
