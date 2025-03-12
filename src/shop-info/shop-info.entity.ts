import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('info')
export class ShopInfo {
    @PrimaryColumn()
    shopName: string;

    @Column()
    shopAddress: string;

    @Column()
    shopNumber: string;

    @Column()
    shopLogo: string;

    @Column({ type: 'date' })
    founded: Date;
}
