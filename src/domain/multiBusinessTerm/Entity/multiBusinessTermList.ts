import { multiBusinessTerm } from './multiBusinessTerm';

// 360度評価期間コレクション
export class multiBusinessTermList {
  private multiTermList: multiBusinessTerm[];
  private constructor(list: multiBusinessTerm[]) {
    this.multiTermList = list;
  }
  public static create(list: multiBusinessTerm[]) {
    return new multiBusinessTermList(list);
  }
  public getFirst(): multiBusinessTerm {
    return this.multiTermList[0];
  }
  public getList(): multiBusinessTerm[] {
    return this.multiTermList;
  }
}
