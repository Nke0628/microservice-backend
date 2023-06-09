import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  BaseRpcExceptionFilter,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'multi_evaluation.v1',
      protoPath: join(
        __dirname,
        'proto/multi_evaluation/v1/multi_evaluation.proto',
      ),
      // loader: {
      //   defaults: true,
      //   objects: true,
      // },
    },
  });
  await app.listen();
}
bootstrap();
