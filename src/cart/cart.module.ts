import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './models/cart-model';


@Module({
  imports: [ OrderModule, TypeOrmModule.forFeature([Cart]) ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
