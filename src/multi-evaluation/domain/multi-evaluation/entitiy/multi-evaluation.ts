import { RpcException } from '@nestjs/microservices';

export class MultiEvaluation {
  public constructor(
    private userId: number,
    private targetUserId: number,
    private multiTermId: number,
    private score: number,
    private goodComment: string,
    private improvementComment: string,
    private id?: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.targetUserId = targetUserId;
    this.multiTermId = multiTermId;
    this.score = score;
    this.goodComment = goodComment;
    this.improvementComment = improvementComment;
  }

  public static newCreate(): MultiEvaluation {
    return new MultiEvaluation(0, 0, 0, 0, '', '');
  }

  public submit(
    userId: number,
    targetUserId: number,
    multiTermId: number,
    score: number,
    goodComment: string,
    improvementComment: string,
  ): void {
    // 全項目必須
    // 同じ期に同じtarget_user_idへ登録していないか
    // 提出期間の期かどうか
    // コメントは200文字以内かどうか
    this.userId = userId;
    this.targetUserId = targetUserId;
    this.multiTermId = multiTermId;
    this.score = score;
    this.goodComment = goodComment;
    this.improvementComment = improvementComment;
  }

  get getId(): number | null {
    return this.id;
  }

  get getUserId(): number {
    return this.userId;
  }

  get getTargetUserId(): number {
    return this.targetUserId;
  }

  get getMultiTermId(): number {
    return this.multiTermId;
  }

  get getScore(): number {
    return this.score;
  }

  get getGoodComment(): string {
    return this.goodComment;
  }

  get getImprovementComment(): string {
    return this.improvementComment;
  }
}
