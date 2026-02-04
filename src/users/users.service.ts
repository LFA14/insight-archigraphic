import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    // Method: create
    // Parameters:
    // - createUserDto: Data Transfer Object containing user details to be created.
    // Returns: The newly created User object.
    // Purpose: Creates a new user in the database.
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    }

    // Method: findAll
    // Parameters: None
    // Returns: An array of User objects.
    // Purpose: Retrieves all users from the database.
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // Method: findOne
    // Parameters:
    // - userID: The ID of the user to retrieve.
    // Returns: The requested User object if found.
    // Purpose: Retrieves a specific user from the database by ID.
    async findOne(userID: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { userID } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userID} not found`);
        }
        return user;
    }

    // Method: update
    // Parameters:
    // - userID: The ID of the user to update.
    // - updateUserDto: Data Transfer Object containing the fields to be updated.
    // Returns: The updated User object.
    // Purpose: Updates an existing user by ID in the database.
    async update(userID: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(userID);
        Object.assign(user, updateUserDto);
        return await this.usersRepository.save(user);
    }

    // Method: remove
    // Parameters:
    // - userID: The ID of the user to delete.
    // Returns: void
    // Purpose: Deletes a user from the database by ID.
    async remove(userID: number): Promise<void> {
        const result = await this.usersRepository.delete(userID);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${userID} not found`);
        }
    }
}
