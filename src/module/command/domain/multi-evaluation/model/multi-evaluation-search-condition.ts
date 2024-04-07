import { ApplyStatus } from '../../norma-apply/value-objet/apply-status';

export class MultiEvaluationSearchCondition {
  private termId: number;
  private userIdList: number[];
  private name: string;
  private reportSubmitStatusList: ApplyStatus[];
  private reportResultStatusList: ApplyStatus[];
  private limit: number;
  private page: number;

  public constructor(
    termId: number,
    userIdList: number[],
    reportSubmitStatusList: ApplyStatus[],
    reportResultStatusList: ApplyStatus[],
    limit: number,
    page: number,
  ) {
    this.termId = termId;
    this.userIdList = userIdList;
    this.reportSubmitStatusList = reportSubmitStatusList;
    this.reportResultStatusList = reportResultStatusList;
    this.limit = limit;
    this.page = page;
  }

  get getTermId(): number {
    return this.termId;
  }

  get getUserId(): number[] {
    return this.userIdList;
  }

  get getName(): string {
    return this.name;
  }

  get getLimit(): number {
    return this.limit;
  }

  get getPage(): number {
    return this.page;
  }

  public isSelectedReportStatusList(): boolean {
    return (
      this.reportSubmitStatusList.length > 0 ||
      this.reportResultStatusList.length > 0
    );
  }

  public isSelectedUnSubmitted(): boolean {
    return this.reportSubmitStatusList.includes(ApplyStatus.APPLYING);
  }

  public isSelectedApproved(): boolean {
    return this.reportSubmitStatusList.some(
      (s) => s.code === ApplyStatus.APPLYING.code,
    );
  }

  public getOffset(): number {
    return this.limit * (this.page - 1);
  }
}
