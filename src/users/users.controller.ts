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

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) userID: number): Promise<User> {
        return this.usersService.findOne(userID);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) userID: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.usersService.update(userID, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) userID: number): Promise<void> {
        return this.usersService.remove(userID);
    }
}
