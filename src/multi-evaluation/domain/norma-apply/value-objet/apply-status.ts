export class ApplyStatus {
  private static readonly _values: ApplyStatus[] = [];

  static readonly UNAPPLIED = new ApplyStatus('未申請', 0);
  static readonly APPLYING = new ApplyStatus('申請中', 1);
  static readonly APPROVE = new ApplyStatus('認可', 2);
  static readonly REMAND = new ApplyStatus('差戻', 3);
  static readonly EXEMPTION = new ApplyStatus('免除', 4);

  private constructor(readonly name: string, readonly code: number) {
    ApplyStatus._values.push(this);
  }

  static fromCode(code: number): ApplyStatus {
    return ApplyStatus._values.find((x) => x.code === code);
  }

  static values(): ApplyStatus[] {
    return ApplyStatus._values;
  }
}
