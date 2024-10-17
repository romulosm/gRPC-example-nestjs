import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ExampleRequest,
  ExampleResponse,
} from './interface/grpc-example.interface';
import { GrpcExampleService } from './grpc-example.service';

@Controller()
export class GrpcExampleController {
  constructor(private readonly grpcExampleService: GrpcExampleService) {}
  @GrpcMethod('GrpcExampleService', 'GetExample')
  getExample(data: ExampleRequest): ExampleResponse {
    return this.grpcExampleService.getExample(data);
  }
}
