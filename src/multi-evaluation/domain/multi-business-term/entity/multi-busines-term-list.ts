import { MultiBusinessTerm } from './multi-business-term';

// 360度評価期間コレクション
export class MultiBusinessTermList {
  private constructor(private multiTermList: MultiBusinessTerm[]) {
    this.multiTermList = multiTermList;
  }
  public static create(list: MultiBusinessTerm[]) {
    return new MultiBusinessTermList(list);
  }
  public getFirst(): MultiBusinessTerm {
    return this.multiTermList[0];
  }
  public getList(): MultiBusinessTerm[] {
    return this.multiTermList;
  }

  public getCurrentTerm(): MultiBusinessTerm | null {
    let ret = null;
    this.multiTermList.map((multiBusinessTerm) => {
      if (multiBusinessTerm.isCurrentTerm()) {
        ret = multiBusinessTerm;
      }
    });
    return ret;
  }
}
