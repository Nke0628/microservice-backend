import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MultiTermModule } from './domain/multiBusinessTerm/multiBusinessTerm.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, MultiTermModule],
  providers: [AppService],
})
export class AppModule {}
