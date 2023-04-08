import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MultiBusinessTermRepository } from './infrastructure/multiBusinessTerm.respository';
import { MultiBusinessTermController } from './presentaion/multiBusinessTerm.cotroller';

@Module({
  imports: [PrismaModule],
  controllers: [MultiBusinessTermController],
  providers: [MultiBusinessTermRepository],
})
export class MultiTermModule {}
