import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronUseCase {
  @Cron(CronExpression.EVERY_10_SECONDS)
  public execute(): void {
    console.log('execute cron job');
  }
}
