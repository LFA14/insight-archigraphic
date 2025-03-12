import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    empID: number;

    @Column()
    empName: string;

    @Column()
    empEmail: string;

    @Column()
    empPhone: string;

    @Column()
    empSalary: number;
}
