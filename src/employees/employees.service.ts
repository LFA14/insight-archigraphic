import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeesRepository: Repository<Employee>,
    ) { }

    create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const employee = this.employeesRepository.create(createEmployeeDto);
        return this.employeesRepository.save(employee);
    }

    async findAll(): Promise<Employee[]> {
        return this.employeesRepository.find();
    }

    async findOne(id: number): Promise<Employee> {
        return this.employeesRepository.findOneOrFail({ where: { empID: id } });
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.findOne(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        Object.assign(employee, updateEmployeeDto);
        return this.employeesRepository.save(employee);
    }

    async remove(id: number): Promise<void> {
        const employee = await this.findOne(id);
        await this.employeesRepository.remove(employee);
    }
}
