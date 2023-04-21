import { MultiBusinessTerm } from '../entity/multi-business-term';

export class MultiBusinessTermMapper {
  public static toDomain(
    id: number,
    businessTermName: string,
    businessTermStartDate: Date,
    businessTermEndDate: Date,
    MultiTermStartDate: Date,
    MultiTermEndDate: Date,
  ): MultiBusinessTerm {
    return MultiBusinessTerm.create(
      {
        businessTermName: businessTermName,
        businessTermStartDate: businessTermStartDate,
        businessTermEndDate: businessTermEndDate,
        MultiTermStartDate: MultiTermStartDate,
        MultiTermEndDate: MultiTermEndDate,
      },
      id,
    );
  }
}
