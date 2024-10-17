import { Module } from '@nestjs/common';
import { GrpcExampleService } from './grpc-example.service';
import { GrpcExampleController } from './grpc-example.controller';

@Module({
  exports: [GrpcExampleService],
  providers: [GrpcExampleService],
  controllers: [GrpcExampleController],
})
export class GrpcExampleModule {}
