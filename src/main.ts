import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'microservice_backend.v1',
      protoPath: [
        join(
          __dirname,
          '../proto/microservice_backend/v1/multi_evaluation.proto',
        ),
        join(
          __dirname,
          '../proto/microservice_backend/v1/multi_evaluation_query.proto',
        ),
        join(__dirname, '../proto/microservice_backend/v1/memo_command.proto'),
      ],
      loader: {
        defaults: true,
        objects: true,
        arrays: true,
      },
    },
  });
  await app.listen();
}
bootstrap();
