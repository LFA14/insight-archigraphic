import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm'; // Import necessary decorators from TypeORM for entity definition

@Entity('info') // Defines the entity that will map to the 'info' table in the database
export class ShopInfo {
    @PrimaryColumn() // Marks the shopName as the primary column (primary key) for the table
    shopName: string; // Defines the 'shopName' property to store the name of the shop

    @Column() // Defines the 'shopAddress' column to store the address of the shop
    shopAddress: string;

    @Column() // Defines the 'shopNumber' column to store the contact number of the shop
    shopNumber: string;

    @Column() // Defines the 'shopLogo' column to store the logo of the shop (typically as a string, e.g., URL or path to image)
    shopLogo: string;

    @Column({ type: 'date' }) // Defines the 'founded' column to store the founding date of the shop (as a date)
    founded: Date; // Defines the 'founded' date property to store the date the shop was founded
}
