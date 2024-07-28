import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { Cart } from './cart/models/cart-model';
import { CartItem } from './cart/models/cart-item-model';
import { User } from './users/models/user-model';
import { Order } from './order/models/order-model';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: 'postgres',
        synchronize: true,
        entities: [Cart, CartItem, User, Order],
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
