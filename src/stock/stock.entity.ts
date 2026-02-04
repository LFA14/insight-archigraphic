import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'; // Importing necessary decorators from TypeORM
import { Product } from '../products/product.entity'; // Importing the Product entity to establish a relationship with Stock

@Entity() // Defining this class as a database entity
export class Stock {
    @PrimaryGeneratedColumn() // Primary key column with auto-generated value
    stockID: number; // Unique identifier for the Stock entry

    @ManyToOne(() => Product, (product) => product.stock) // Defining a many-to-one relationship with the Product entity
    @JoinColumn({ name: 'productID' }) // Establishing the foreign key column in the Stock table
    product: Product; // The related Product entity

    @Column() // Column definition for the quantity of stock
    quantity: number; // The number of items in stock

    @Column() // Column definition for the restock threshold value
    restockThreshold: number; // The threshold below which stock should be restocked

    @Column() // Column definition for the supplier name from which the stock was purchased
    boughtFrom: string; // The source or supplier of the stock

    @Column() // Column definition for the price at which the stock was bought
    boughtFor: string; // The price paid for the stock
}
