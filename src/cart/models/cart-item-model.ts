import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Cart } from './cart-model';
import { Order } from '../../order/models/order-model';

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'jsonb', nullable:true })
    product: {
        id: string;
        title: string;
        description: string;
        price: number;
    };

    @Column('int')
    count: number;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;

    @ManyToMany(() => Order, (order) => order.items)
    orders: Order[];
}