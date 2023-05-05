// 360度評価期間
export class MultiTerm {
  id: number;
  businessTermName: string;
  businessTermStartDate: Date;
  businessTermEndDate: Date;
  multiTermStartDate: Date;
  multiTermEndDate: Date;

  public constructor(
    id: number,
    businessTermName: string,
    businessTermStartDate: Date,
    businessTermEndDate: Date,
    multiTermStartDate: Date,
    multiTermEndDate: Date,
  ) {
    this.id = id;
    this.businessTermName = businessTermName;
    this.businessTermStartDate = businessTermStartDate;
    this.businessTermEndDate = businessTermEndDate;
    this.multiTermStartDate = multiTermStartDate;
    this.multiTermEndDate = multiTermEndDate;
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
    return this.multiTermStartDate;
  }

  get getMultiTermEndDate() {
    return this.multiTermEndDate;
  }

  // 現在対象期間かどうか
  public isCurrentTerm(): boolean {
    const currentDate = new Date();
    return (
      this.businessTermStartDate.getTime() <= currentDate.getTime() &&
      this.businessTermEndDate.getTime() >= currentDate.getTime()
    );
  }
}
