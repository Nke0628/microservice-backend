export class ApplyResult {
  public constructor(private remandReason: string, private id?: number) {
    this.remandReason = remandReason;
    this.id = id;
  }

  static initialCreate(): ApplyResult {
    return new ApplyResult('');
  }
}
