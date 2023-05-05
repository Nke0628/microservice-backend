import { Optional } from 'typescript-optional';
import { MultiTerm } from './multi-term';

// 360度評価期間コレクション
export class MultiTermList {
  public constructor(private multiTermList: MultiTerm[]) {
    this.multiTermList = multiTermList;
  }

  public getFirst(): MultiTerm {
    return this.multiTermList[0];
  }
  public getList(): MultiTerm[] {
    return this.multiTermList;
  }

  public getCurrentTerm(): Optional<MultiTerm> {
    let result = null;
    this.multiTermList.map((multiBusinessTerm) => {
      if (multiBusinessTerm.isCurrentTerm()) {
        result = multiBusinessTerm;
      }
    });
    return Optional.ofNullable(result);
  }
}
