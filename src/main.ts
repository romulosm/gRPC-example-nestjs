import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useLogger(['error', 'log', 'warn']);
  const grpcOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'example',
      protoPath: join(__dirname, '../src/grpc-example/example.proto'),
      url: `${configService.envConfig.grpcUrl.toString()}:${configService.envConfig.grpcPort.toString()}`,
    },
  };

  app.connectMicroservice(grpcOptions);
  await app.startAllMicroservices();
  await app.listen(configService.envConfig.httpPort);
}

bootstrap();
