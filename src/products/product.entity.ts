import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stock } from 'src/stock/stock.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productID: number;

    @Column()
    productName: string;

    @Column()
    productPrice: String;

    @Column()
    productDesc: string;

    @Column()
    productImage: string;

    @OneToMany(() => Stock, (stock) => stock.product)
    stock: Stock[];
}
