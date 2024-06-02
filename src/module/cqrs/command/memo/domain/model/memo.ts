import { AggregateRoot } from '@nestjs/cqrs';

export class Memo extends AggregateRoot {
  /** メモID  */
  private id: string;

  /** メモ内容 */
  private content: string;

  public get getId(): string {
    return this.id;
  }
}
