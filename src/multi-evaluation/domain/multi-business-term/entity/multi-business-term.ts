import { Entity } from 'src/multi-evaluation/domain/shared/entitiy';

// 360度評価期間
interface IMultiBusinessTermProps {
  businessTermName: string;
  businessTermStartDate: Date;
  businessTermEndDate: Date;
  MultiTermStartDate: Date;
  MultiTermEndDate: Date;
}
export class MultiBusinessTerm extends Entity<IMultiBusinessTermProps> {
  private constructor(props: IMultiBusinessTermProps, id: number) {
    super(props, id);
  }

  public static create(props: IMultiBusinessTermProps, id: number) {
    return new MultiBusinessTerm(props, id);
  }

  get getId() {
    return this.id;
  }

  get getBusinessTermName() {
    return this.props.businessTermName;
  }

  get getBusinessTermStartDate() {
    return this.props.businessTermStartDate;
  }

  get getBusinessTermEndDate() {
    return this.props.businessTermEndDate;
  }

  get getMultiTermStartDate() {
    return this.props.MultiTermStartDate;
  }

  get getMultiTermEndDate() {
    return this.props.MultiTermEndDate;
  }

  // 現在対象期間かどうか
  public isCurrentTerm(): boolean {
    const currentDate = new Date();
    return (
      this.props.businessTermStartDate.getTime() <= currentDate.getTime() &&
      this.props.businessTermEndDate.getTime() >= currentDate.getTime()
    );
  }
}
