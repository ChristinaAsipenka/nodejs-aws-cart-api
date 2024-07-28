import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', '.env') });

export class CdkDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const server = new nodejs.NodejsFunction(this, 'server', {
      functionName: 'nodejs-aws-cart-api',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'dist/src')),
      handler: 'main.handler',
      timeout: cdk.Duration.seconds(30),
      memorySize: 1024,
      runtime: lambda.Runtime.NODEJS_16_X,
      environment: {
        RDS_CONNECTION_URL: String(process.env.RDS_CONNECTION_URL),
        DB_HOST: String(process.env.DB_HOST),
        DB_PORT: String(process.env.DB_PORT),
        DB_USERNAME: String(process.env.DB_USERNAME),
        DB_PASSWORD: String(process.env.DB_PASSWORD),
        DB_NAME: String(process.env.DB_NAME),
      },
      bundling: {
        externalModules: [
          '@nestjs/microservices',
          '@nestjs/websockets',
          '@nestjs/core',
          '@nestjs/common',
          '@nestjs/platform-express',
          'class-transformer',
          'class-validator',
        ],
      },
    });

    // exposes the lambda function via HTTP URL
    const { url } = server.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: { allowedOrigins: ['*'] },
    });

    new cdk.CfnOutput(this, 'Url', { value: url });
  }
}