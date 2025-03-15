import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(userID: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ userID });
        if (!user) {
            throw new NotFoundException(`User with ID ${userID} not found`);
        }
        return user;
    }

    async remove(userID: number): Promise<void> {
        const result = await this.usersRepository.delete(userID);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${userID} not found`);
        }
    }
}
