import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  createMemoRequest,
  createMemoResponse,
  MemoCommandServiceController,
} from 'src/proto/generated/microservice_backend/v1/memo_command';
import { Memo } from './command/memo/domain/model/memo';

@Controller('')
export class MemoCommandController implements MemoCommandServiceController {
  @GrpcMethod('MemoCommandService')
  async createMemo(request: createMemoRequest): Promise<createMemoResponse> {
    const memo = new Memo();
    return new Promise((resolve) => {
      resolve({ id: 'hoge' });
    });
  }
}
