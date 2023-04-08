// 360度評価期間
export class multiBusinessTerm {
  private id: number;
  private businessTermName: string;
  private businessTermStartDate: Date;
  private businessTermEndDate: Date;
  private MultiTermStartDate: Date;
  private MultiTermEndDate: Date;

  private constructor(
    id: number,
    businessTermName: string,
    businessTermStartDate: Date,
    businessTermEndDate: Date,
    MultiTermStartDate: Date,
    MultiTermEndDate: Date,
  ) {
    this.id = id;
    this.businessTermName = businessTermName;
    this.businessTermStartDate = businessTermStartDate;
    this.businessTermEndDate = businessTermEndDate;
    this.MultiTermStartDate = MultiTermStartDate;
    this.MultiTermEndDate = MultiTermEndDate;
  }

  public static create(
    id: number,
    businessTermName: string,
    businessTermStartDate: Date,
    businessTermEndDate: Date,
    MultiTermStartDate: Date,
    MultiTermEndDate: Date,
  ) {
    return new multiBusinessTerm(
      id,
      businessTermName,
      businessTermStartDate,
      businessTermEndDate,
      MultiTermStartDate,
      MultiTermEndDate,
    );
  }

  get getId() {
    return this.id;
  }

  get getBusinessTermName() {
    return this.businessTermName;
  }

  get getBusinessTermStartDate() {
    return this.businessTermStartDate;
  }

  get getBusinessTermEndDate() {
    return this.businessTermEndDate;
  }

  get getMultiTermStartDate() {
    return this.MultiTermStartDate;
  }

  get getMultiTermEndDate() {
    return this.MultiTermEndDate;
  }
}
