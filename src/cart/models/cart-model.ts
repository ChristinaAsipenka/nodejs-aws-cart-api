import { Entity, Column, PrimaryGeneratedColumn, OneToMany,CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { CartItem } from './cart-item-model';

export enum CartStatuses {
    OPEN = 'OPEN',
    STATUS = 'STATUS'
}

@Entity({ name: 'carts' })
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'uuid'})
    user_id: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({
        type: 'enum',
        enum: CartStatuses,
        default: CartStatuses.OPEN
    })
    status: CartStatuses;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items: CartItem[];
}