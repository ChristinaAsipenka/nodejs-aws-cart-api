import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-item-model';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column('decimal', {precision: 10, scale:2})
    price: number;

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cartItems: CartItem[]
}
