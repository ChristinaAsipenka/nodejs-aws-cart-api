import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models/cart-model';
import { CartItem } from '../models/cart-item-model';
import { CartStatuses } from '../models/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  /*private userCarts: Record<string, Cart> = {};

  findByUserId(userId: string): Cart {
    return this.userCarts[ userId ];
  }*/

  constructor(
      @InjectRepository(Cart)
      private cartRepository: Repository<Cart>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findOne({ where: { id: userId } });
  }

  /*createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[ userId ] = userCart;

    return userCart;
  }*/

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }
  async createByUserId(userId: string): Promise<Cart> {
    const userCart = this.cartRepository.create({
      id: userId,
      user_id: userId,
      items: [],
    });

    return this.cartRepository.save(userCart);
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }
    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items, status }: Cart): Promise<Cart> {
    let userCart = await this.findOrCreateByUserId(userId);
    userCart.items = items;
    userCart.status = status;
    return this.cartRepository.save(userCart);
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartRepository.delete(userId);
  }
}
