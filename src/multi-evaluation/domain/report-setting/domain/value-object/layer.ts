export class Layer {
  private static readonly _values: Layer[] = [];

  static readonly SECTION = new Layer('セクション層', 1);
  static readonly EGG_ASISTANT = new Layer('EGGアシスタント層', 2);
  static readonly EGG_GENERAL = new Layer('EGG一般層', 3);
  static readonly GENERAL = new Layer('一般層', 4);
  static readonly LEADER = new Layer('リーダー層', 5);
  static readonly SUB_CHEIF = new Layer('サブチーフ層', 6);

  private constructor(readonly name: string, readonly code: number) {
    Layer._values.push(this);
  }

  static fromCode(code: number): Layer {
    return Layer._values.find((x) => x.code === code);
  }

  get getName(): string {
    return this.name;
  }

  get getCode(): number {
    return this.code;
  }

  // TODO プロパティから生成したい
  static getLayerList(): Layer[] {
    return [
      Layer.SECTION,
      Layer.EGG_ASISTANT,
      Layer.EGG_GENERAL,
      Layer.GENERAL,
      Layer.LEADER,
      Layer.SUB_CHEIF,
    ];
  }
}
