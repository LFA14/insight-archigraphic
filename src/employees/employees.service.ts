import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
    // Constructor for EmployeesService
    // Purpose: Injects the Employee repository to handle database operations
    constructor(
        @InjectRepository(Employee)
        private readonly employeesRepository: Repository<Employee>,
    ) { }

    // Method: create
    // Parameters:
    // - createEmployeeDto: DTO containing employee data to be created
    // Returns: The created Employee entity
    // Purpose: Creates and saves a new employee to the database
    async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const employee = this.employeesRepository.create(createEmployeeDto);
        return await this.employeesRepository.save(employee);
    }

    // Method: findAll
    // Returns: An array of all Employee entities
    // Purpose: Retrieves all employees from the database
    async findAll(): Promise<Employee[]> {
        return await this.employeesRepository.find();
    }

    // Method: findOne
    // Parameters:
    // - id: The ID of the employee to find
    // Returns: The Employee entity with the given ID
    // Throws: NotFoundException if employee is not found
    // Purpose: Retrieves a single employee by ID
    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeesRepository.findOne({ where: { empID: id } });
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }

    // Method: update
    // Parameters:
    // - id: The ID of the employee to update
    // - updateEmployeeDto: DTO containing updated fields
    // Returns: The updated Employee entity
    // Purpose: Updates an existing employee's information
    async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.findOne(id);
        Object.assign(employee, updateEmployeeDto);
        return await this.employeesRepository.save(employee);
    }

    // Method: remove
    // Parameters:
    // - id: The ID of the employee to remove
    // Returns: void
    // Throws: NotFoundException if employee is not found
    // Purpose: Deletes an employee by ID
    async remove(id: number): Promise<void> {
        const result = await this.employeesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
    }
}
