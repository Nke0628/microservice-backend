import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MultiBusinessTermRepository } from './domain/multi-business-term/infrastructure/multi-business-term.respository';
import { MultiEvaluationRepository } from './domain/multi-evaluation/infrastructure/multi-evaluation.repository';
import { UserRepository } from './domain/user/infrastructure/user.repository';
import { MultiEvaluationController } from './presentation/multi-evaluation.cotroller';
import { MultiEvaluationService } from './service/multi-evaluation.service';

@Module({
  imports: [PrismaModule],
  controllers: [MultiEvaluationController],
  providers: [
    UserRepository,
    MultiBusinessTermRepository,
    MultiEvaluationRepository,
    MultiEvaluationService,
  ],
  exports: [MultiBusinessTermRepository],
})
export class MultiEvaluaionModule {}
