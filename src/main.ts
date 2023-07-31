import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const yamlFile = resolve(cwd(), 'doc', 'api.yaml');
  const fileContent = await readFile(yamlFile, 'utf-8');
  SwaggerModule.setup('doc', app, parse(fileContent));

  await app.listen(Number(process.env.PORT) || 4000);
}
bootstrap();
