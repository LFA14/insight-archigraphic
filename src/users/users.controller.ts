import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
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

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) userID: number): Promise<void> {
        return this.usersService.remove(userID);
    }
}
