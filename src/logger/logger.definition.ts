// my-module.definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { LoggerModuleOptions } from './logger.options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<LoggerModuleOptions>()
    .setClassMethodName('register')
    .build();
