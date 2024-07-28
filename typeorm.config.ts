import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Cart, CartItem, Product } from 'src/cart/models';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST, // RDS endpoint
    port: parseInt(process.env.DB_PORT, 10) || 5432, // Default PostgreSQL port
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Cart, CartItem, Product],
    synchronize: true, // Set to false in production
};