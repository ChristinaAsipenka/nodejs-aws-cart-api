
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart-model';
import { Product } from './product-model';

@Entity({ name: 'cart_items' })
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    cart_id: string;

    @ManyToOne(() => Cart, (cart) => cart.items)
    @JoinColumn({ name: 'cart_id' })
    cart: Cart;

    @Column({ type: 'uuid' })
    product_id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('int')
    count: number;
}
