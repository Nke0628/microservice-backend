import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MultiEvaluaionModule } from './multi-evaluation/multi-evaluation.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/exception/all-exception-filter';
import { MultiEvaluationQueryModule } from './query/multi-evaluation-query/multi-evaluation-query.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    MultiEvaluaionModule,
    MultiEvaluationQueryModule,
    CronModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
