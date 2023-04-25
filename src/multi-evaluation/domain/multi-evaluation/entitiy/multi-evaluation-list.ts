import { MultiEvaluation } from './multi-evaluation';

export class MultiEvaluationList {
  public constructor(private multiEvaluationList: MultiEvaluation[]) {
    this.multiEvaluationList = multiEvaluationList;
  }
  public static create(list: MultiEvaluation[]) {
    return new MultiEvaluationList(list);
  }
  public getFirst(): MultiEvaluation {
    return this.multiEvaluationList[0];
  }
  public getList(): MultiEvaluation[] {
    return this.multiEvaluationList;
  }
}
