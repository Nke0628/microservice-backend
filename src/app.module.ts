import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MultiEvaluaionModule } from './multi-evaluation/multi-evaluation.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, MultiEvaluaionModule],
  providers: [AppService],
})
export class AppModule {}
