import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Marks this class as an entity for TypeORM, corresponding to a table in the database
export class Employee {
    @PrimaryGeneratedColumn() // Automatically generates a unique ID for each employee
    empID: number;

    @Column() // Represents a column in the database for the employee's name
    empName: string;

    @Column() // Represents a column in the database for the employee's email address
    empEmail: string;

    @Column() // Represents a column in the database for the employee's phone number
    empPhone: string;

    @Column() // Represents a column in the database for the employee's role/position in the company
    empRole: string;

    @Column() // Represents a column in the database for the employee's salary
    empSalary: number;
}
