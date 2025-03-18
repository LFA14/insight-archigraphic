import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService, // Inject ConfigService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.configService.get<string>('SECRET_KEY'), // Use the secret key from .env
            }),
            user
        };
    }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { username, password, firstName, lastName } = signUpDto;
        console.log(username, password, firstName, lastName); // Debugging

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersRepository.save({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });

        const token = this.jwtService.sign(
            { id: user.userID },
            {
                secret: this.configService.get<string>('SECRET_KEY'),
            }
        );

        return { token };
    }
}
