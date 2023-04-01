import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { sample } from 'rxjs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'sample',
      protoPath: join(__dirname, 'proto/sample.proto'),
    },
  });
  await app.listen();
}
bootstrap();
