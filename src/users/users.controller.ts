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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Method: create
    // Route: POST /users
    // Parameters:
    // - createUserDto: Data Transfer Object containing user details for creation.
    // Returns: The newly created User object.
    // Purpose: Creates a new user record in the database.
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    // Method: findAll
    // Route: GET /users
    // Parameters: None
    // Returns: An array of User objects.
    // Purpose: Retrieves all user records from the database.
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // Method: findOne
    // Route: GET /users/:id
    // Parameters:
    // - id: The ID of the user to retrieve.
    // Returns: The requested User object if found.
    // Purpose: Retrieves a specific user record by its ID.
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) userID: number): Promise<User> {
        return this.usersService.findOne(userID);
    }

    // Method: update
    // Route: PATCH /users/:id
    // Parameters:
    // - id: The ID of the user to update.
    // - updateUserDto: Data Transfer Object containing fields to update.
    // Returns: The updated User object.
    // Purpose: Updates an existing user record by its ID.
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) userID: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.usersService.update(userID, updateUserDto);
    }

    // Method: remove
    // Route: DELETE /users/:id
    // Parameters:
    // - id: The ID of the user to delete.
    // Returns: void
    // Purpose: Deletes a user record from the database by its ID.
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) userID: number): Promise<void> {
        return this.usersService.remove(userID);
    }
}
