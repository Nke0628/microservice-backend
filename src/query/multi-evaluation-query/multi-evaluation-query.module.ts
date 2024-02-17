import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MultiEvaluationQueryController } from './presentation/multi-evaluation-query.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MultiEvaluationQueryController],
  providers: [],
})
export class MultiEvaluationQueryModule {}
