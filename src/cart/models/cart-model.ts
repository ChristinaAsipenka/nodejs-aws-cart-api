import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CartStatuses } from './index';
import { CartItem } from './cart-item-model';

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    user_id?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({
        type: 'enum',
        enum: CartStatuses,
        default: CartStatuses.OPEN,
    })
    status?: CartStatuses;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true, eager: true })
    items: CartItem[];
}