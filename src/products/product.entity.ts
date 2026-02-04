import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stock } from 'src/stock/stock.entity'; // Import the Stock entity to establish a relationship with the Product entity

@Entity() // Decorator that marks this class as a database entity
export class Product {
    @PrimaryGeneratedColumn() // Automatically generates a unique primary key for the product
    productID: number;

    @Column() // Marks the productName column in the database
    productName: string;

    @Column() // Marks the productPrice column in the database
    productPrice: String;

    @Column() // Marks the productDesc column in the database
    productDesc: string;

    @Column() // Marks the productCategory column in the database
    productCategory: string;

    @Column() // Marks the productImage column in the database
    productImage: string;

    @OneToMany(() => Stock, (stock) => stock.product) // Defines a one-to-many relationship between Product and Stock
    stock: Stock[]; // Array of Stock entities related to this Product
}
