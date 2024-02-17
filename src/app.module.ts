import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MultiEvaluaionModule } from './multi-evaluation/multi-evaluation.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/exception/all-exception-filter';

@Module({
  imports: [PrismaModule, MultiEvaluaionModule],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
