import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    stockID: number;

    @ManyToOne(() => Product, (product) => product.stock)
    @JoinColumn({ name: 'productID' })
    product: Product;

    @Column()
    quantity: number;

    @Column()
    restockThreshold: number;

    @Column()
    boughtFrom: string;

    @Column()
    boughtFor: string;
}


