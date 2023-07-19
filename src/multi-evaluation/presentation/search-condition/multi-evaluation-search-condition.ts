export class MultiEvaluationSearchCondition {
  private termId: number;
  private userId: number;
  private limit: number;
  private page: number;

  public constructor(
    termId: number,
    userId: number,
    limit: number,
    page: number,
  ) {
    this.termId = termId;
    this.userId = userId;
    this.limit = limit;
    this.page = page;
  }

  get getTermId(): number {
    return this.termId;
  }

  get getUserId(): number {
    return this.userId;
  }

  get getLimit(): number {
    return this.limit;
  }

  get getPage(): number {
    return this.page;
  }

  public getOffset(): number {
    return this.limit * (this.page - 1);
  }
}
