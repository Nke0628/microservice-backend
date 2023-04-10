import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MultiBusinessTermRepository } from './infrastructure/multi-business-term.respository';
import { MultiBusinessTermController } from './presentaion/multi-business-term.cotroller';
import { MultiBusinessTermService } from './service/multi-business-term.service';

@Module({
  imports: [PrismaModule],
  controllers: [MultiBusinessTermController],
  providers: [MultiBusinessTermRepository, MultiBusinessTermService],
  exports: [MultiBusinessTermRepository],
})
export class MultiTermModule {}
