import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'evaluation',
      protoPath: join(
        __dirname,
        'proto/multiBusinessTerm/v1/multiBusinessTerm.proto',
      ),
    },
  });
  await app.listen();
}
bootstrap();
