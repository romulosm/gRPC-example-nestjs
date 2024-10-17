/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
import { ConfigEnv, NodeEnv } from './config-env.model';

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly logger = new Logger(ConfigService.name);

  readonly envConfig: ConfigEnv;

  constructor() {
    if (process.env.NODE_ENV !== NodeEnv.Test) {
      dotenv.config();
    }
    try {
      this.envConfig = this.validateInput(process.env);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  onModuleInit() {
    this.logger.log('Env config initialized successfully');
  }

  protected initEnvConfig(config: any): ConfigEnv {
    const envConfig = new ConfigEnv();
    envConfig.httpPort = parseInt(config.HTTP_PORT, 10);
    envConfig.grpcPort = parseInt(config.GRPC_PORT, 10);
    envConfig.grpcUrl = config.GRPC_URL;
    envConfig.nodeEnv = config.NODE_ENV;
    return envConfig;
  }

  private validateInput(config: any): ConfigEnv {
    const envConfig = this.initEnvConfig(config);
    const errors = validateSync(envConfig);
    if (errors.length) {
      throw errors.pop();
    }
    return envConfig;
  }
}
