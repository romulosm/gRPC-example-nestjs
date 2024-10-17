import { Injectable } from '@nestjs/common';
import {
  ExampleRequest,
  ExampleResponse,
} from './interface/grpc-example.interface';

@Injectable()
export class GrpcExampleService {
  getExample(data: ExampleRequest): ExampleResponse {
    console.log(`Received data: ${JSON.stringify(data)}`);

    if (!data.id) {
      throw new Error('ID is required');
    }

    return { message: `Received request with ID: ${data.id}` };
  }
}
