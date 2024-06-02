import { Module } from '@nestjs/common';
import { MemoCommandController } from './memo-command.controller';

@Module({
  imports: [],
  controllers: [MemoCommandController],
  providers: [],
})
export class MemoCommandModule {}
