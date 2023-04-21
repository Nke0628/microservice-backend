export class MultiEvaluation {
  public constructor(
    private userId: number,
    private targetUserId: number,
    private multiTermId: number,
    private score: number,
    private comment: string,
    private id?: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.targetUserId = targetUserId;
    this.multiTermId = multiTermId;
    this.score = score;
    this.comment = comment;
  }

  public static newCreate(): MultiEvaluation {
    return new MultiEvaluation(0, 0, 0, 0, '');
  }

  public submit(
    userId: number,
    targetUserId: number,
    multiTermId: number,
    score: number,
    comment: string,
  ): void {
    // 全項目必須
    // 同じ期に同じtarget_user_idへ登録していないか
    // 提出期間の期かどうか
    // コメントは200文字以内かどうか
    this.userId = userId;
    this.targetUserId = targetUserId;
    this.multiTermId = multiTermId;
    this.score = score;
    this.comment = comment;
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

  get getComment(): string {
    return this.comment;
  }
}
