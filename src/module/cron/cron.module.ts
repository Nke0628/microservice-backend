import { Module } from '@nestjs/common';
import { CronUseCase } from './usecase/cron-usecase';

@Module({
  imports: [],
  providers: [CronUseCase],
  exports: [CronUseCase],
})
export class CronModule {}
