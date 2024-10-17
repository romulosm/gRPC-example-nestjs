import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { GrpcExampleModule } from './grpc-example/grpc-example.module';

@Module({
  imports: [GrpcExampleModule, ConfigModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
