import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity'; // Import the Employee entity to be used with TypeORM
import { EmployeesController } from './employees.controller'; // Import the EmployeesController to handle HTTP requests
import { EmployeesService } from './employees.service'; // Import the EmployeesService to handle the business logic

@Module({
    imports: [TypeOrmModule.forFeature([Employee])], // Registers the Employee entity with TypeORM, allowing it to be injected into services
    providers: [EmployeesService], // Registers the EmployeesService as a provider for the module
    controllers: [EmployeesController], // Registers the EmployeesController to handle incoming requests
})
export class EmployeesModule { } // The EmployeesModule encapsulates the employee-related functionality of the application
