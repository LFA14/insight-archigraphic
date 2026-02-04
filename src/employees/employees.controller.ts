import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Patch,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    // Method: create
    // Route: POST /employees
    // Parameters:
    // - createEmployeeDto: An object containing employee details (name, email, phone, salary).
    // Returns: The newly created Employee object.
    // Purpose: Adds a new employee to the database.
    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeesService.create(createEmployeeDto);
    }

    // Method: findAll
    // Route: GET /employees
    // Parameters: None.
    // Returns: An array of all Employee objects.
    // Purpose: Fetches all employees from the database.
    @Get()
    findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    // Method: findOne
    // Route: GET /employees/:id
    // Parameters:
    // - id: The ID of the employee to fetch (parsed as an integer).
    // Returns: The Employee object with the specified ID.
    // Purpose: Fetches a specific employee by ID.
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
        return this.employeesService.findOne(id);
    }

    // Method: update
    // Route: PATCH /employees/:id
    // Parameters:
    // - id: The ID of the employee to update.
    // - updateEmployeeDto: An object containing updated employee fields.
    // Returns: The updated Employee object.
    // Purpose: Updates details of a specific employee.
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEmployeeDto: UpdateEmployeeDto
    ): Promise<Employee> {
        return this.employeesService.update(id, updateEmployeeDto);
    }

    // Method: remove
    // Route: DELETE /employees/:id
    // Parameters:
    // - id: The ID of the employee to delete.
    // Returns: A void Promise after deletion.
    // Purpose: Removes a specific employee from the database.
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.employeesService.remove(id);
    }
}
