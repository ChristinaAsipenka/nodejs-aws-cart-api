import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart ? cart.items.reduce((acc: number, item: CartItem) => {
    return acc += item.product.price * item.count;
  }, 0) : 0;
}