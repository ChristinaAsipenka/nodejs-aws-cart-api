
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cart, CartStatuses } from '../models/cart-model';
import { CartItem } from '../models/cart-item-model';
import { Product } from '../models/product-model';

@Injectable()
export class CartService {
  constructor(
      @InjectRepository(Cart)
      private readonly cartRepository: Repository<Cart>,

      @InjectRepository(CartItem)
      private readonly cartItemRepository: Repository<CartItem>,

      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>
  ) {}


  async findByUserId(userId: string): Promise<Cart> {
    const cart =  this.cartRepository.findOne({ where: { user_id: userId }, relations: ['items', 'items.product'] });

    return cart;
  }

  async createByUserId(userId: string): Promise<Cart> {
    const cart = new Cart();
    cart.id = uuidv4();
    cart.user_id = userId;
    cart.created_at = new Date();
    cart.updated_at = new Date();
    cart.status = CartStatuses.OPEN;
    cart.items = [];

    return this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let cart = await this.findByUserId(userId);

    if (!cart) {
      cart = await this.createByUserId(userId);
    }

    return cart;
  }

  async updateByUserId(userId: string, items: CartItem[]): Promise<Cart> {

    const cart = await this.findByUserId(userId);

    if(cart) {
      for(const itemData of cart.items) {
        const product = await this.productRepository.findOne({where: {id: itemData.product_id}});
        const cartItem = new CartItem();
        cartItem.cart_id = cart.id;
        cartItem.product = product;
        cartItem.count = itemData.count;
        await this.cartItemRepository.save(cartItem);
      }
    }
    return this.findByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    const cart = await this.findByUserId(userId);
    if (cart) {
      await this.cartItemRepository.remove(cart.items);
      await this.cartRepository.remove(cart);
    }
  }

}
