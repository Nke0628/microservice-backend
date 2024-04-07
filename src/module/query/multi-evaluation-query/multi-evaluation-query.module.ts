import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MultiEvaluationQueryController } from './presentation/multi-evaluation-query.controller';
import { MultiEvaluationQuery } from './query/multi-evaluation-query';

@Module({
  imports: [PrismaModule],
  controllers: [MultiEvaluationQueryController],
  providers: [MultiEvaluationQuery],
})
export class MultiEvaluationQueryModule {}
