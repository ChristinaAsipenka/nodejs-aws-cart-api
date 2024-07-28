import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';

import { CartItem } from '../../cart/models/cart-item-model';

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'uuid' })
    cart_id: string;

    @ManyToMany(() => CartItem)
    @JoinTable()
    items: CartItem[];

    @Column('jsonb')
    payment: {
        type: string;
        address?: any;
        creditCard?: any;
    };

    @Column('jsonb')
    delivery: {
        type: string;
        address: any;
    };

    @Column('text')
    comments: string;

    @Column({
        type: 'enum',
        enum: ['OPEN', 'ORDERED'],
        default: 'OPEN',
    })
    status: string;

    @Column('numeric')
    total: number;
}