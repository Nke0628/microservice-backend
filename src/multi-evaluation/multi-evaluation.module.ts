import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MultiTermRepository } from './domain/multi-term/infrastructure/multi-term.respository';
import { MultiEvaluationRepository } from './domain/multi-evaluation/infrastructure/multi-evaluation.repository';
import { UserRepository } from './domain/user/infrastructure/user.repository';
import { MultiEvaluationController } from './presentation/multi-evaluation.cotroller';

@Module({
  imports: [PrismaModule],
  controllers: [MultiEvaluationController],
  providers: [UserRepository, MultiTermRepository, MultiEvaluationRepository],
})
export class MultiEvaluaionModule {}
