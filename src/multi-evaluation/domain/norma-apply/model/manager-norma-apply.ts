import { ApplyStatus } from '../value-objet/apply-status';

export class ManagerNormaApply {
  public constructor(
    private userId: number,
    private termId: number,
    private reason: string,
    private exemptionCount: number,
    private applyStatus: ApplyStatus,
    private remandReason: string,
    private id?: number,
  ) {
    this.userId = userId;
    this.termId = termId;
    this.reason = reason;
    this.exemptionCount = exemptionCount;
    this.applyStatus = applyStatus;
    this.remandReason = remandReason;
    this.id = id;
  }

  static initialCreate(userId: number, termId: number): ManagerNormaApply {
    return new ManagerNormaApply(
      userId,
      termId,
      '',
      0,
      ApplyStatus.UNAPPLIED,
      '',
    );
  }

  get getId(): number {
    return this.id;
  }

  get getUserId(): number {
    return this.userId;
  }

  get getTermId(): number {
    return this.termId;
  }

  get getReason(): string {
    return this.reason;
  }

  get getexemptionCount(): number {
    return this.exemptionCount;
  }

  get getApplyStatus(): ApplyStatus {
    return this.applyStatus;
  }

  get getRemandReason(): string {
    return this.remandReason;
  }
}
