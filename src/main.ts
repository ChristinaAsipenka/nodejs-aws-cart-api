import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Context, Callback } from 'aws-lambda';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';

const expressApp = express();

async function bootstrap(): Promise<Server> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
  });

  app.use(helmet());
  await app.init();

  return createServer(expressApp);
}

const handler = async (event: any, context: Context) => {
  const server = await bootstrap();
  return proxy(server, event, context, 'PROMISE').promise;
};
module.exports.handler = handler;
