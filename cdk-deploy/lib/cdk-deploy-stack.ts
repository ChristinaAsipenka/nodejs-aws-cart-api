import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { RDS_CONNECTION_URL, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from '../../config';
import * as path from 'path';

export class CdkDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const server = new nodejs.NodejsFunction(this, 'server', {
      functionName: 'nodejs-aws-cart-api',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'dist')),
      handler: 'main.handler',
      timeout: cdk.Duration.seconds(30),
      memorySize: 1024,
      runtime: lambda.Runtime.NODEJS_16_X,
      environment: {
        RDS_CONNECTION_URL: String(RDS_CONNECTION_URL),
        DB_HOST: String(DB_HOST),
        DB_PORT: String(DB_PORT),
        DB_USERNAME: String(DB_USERNAME),
        DB_PASSWORD: String(DB_PASSWORD),
        DB_NAME: String(DB_NAME),
      },
      bundling: {
        externalModules: [
          '@nestjs/microservices',
          '@nestjs/websockets',
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