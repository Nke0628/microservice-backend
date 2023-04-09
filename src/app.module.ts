import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MultiTermModule } from './domain/multi-business-term/multi-business-term.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, MultiTermModule],
  providers: [AppService],
})
export class AppModule {}
