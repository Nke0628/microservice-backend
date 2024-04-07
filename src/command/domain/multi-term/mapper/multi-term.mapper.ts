import { MultiTermWithBusinessTerm as MultiTermWithBusinessTermEntitiy } from '../infrastructure/multi-term.respository';
import { MultiTerm } from '../model/multi-term';
import { MultiTermList } from '../model/multi-term-list';

export class MultiTermMapper {
  public static toDomain(
    multiTermWithBusinessTermEntitiy: MultiTermWithBusinessTermEntitiy,
  ): MultiTerm {
    return new MultiTerm(
      multiTermWithBusinessTermEntitiy.id,
      multiTermWithBusinessTermEntitiy.business_term.term_name,
      multiTermWithBusinessTermEntitiy.business_term.start_date,
      multiTermWithBusinessTermEntitiy.business_term.end_date,
      multiTermWithBusinessTermEntitiy.start_date,
      multiTermWithBusinessTermEntitiy.end_date,
    );
  }

  public static toDomainList(
    multiTermWithBusinessTermEntitiies: MultiTermWithBusinessTermEntitiy[],
  ): MultiTermList {
    const multiTermList = multiTermWithBusinessTermEntitiies.map(
      (multiTermWithBusinessTermEntitiy) => {
        return this.toDomain(multiTermWithBusinessTermEntitiy);
      },
    );
    return new MultiTermList(multiTermList);
  }
}
