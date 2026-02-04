// Import core decorators and exceptions from NestJS common package
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Import decorator for injecting a TypeORM repository
import { InjectRepository } from '@nestjs/typeorm';

// Import TypeORM's Repository class for database operations
import { Repository } from 'typeorm';

// Import the User entity to perform authentication-related queries
import { User } from '../users/user.entity';

// Import bcrypt for password hashing and comparison
import * as bcrypt from 'bcrypt';

// Import JwtService for generating and signing JWT tokens
import { JwtService } from '@nestjs/jwt';

// Import Data Transfer Object used during user sign-up
import { SignUpDto } from './dto/signup.dto';

// Import ConfigService for accessing environment variables (e.g., secret keys)
import { ConfigService } from '@nestjs/config'; // Import ConfigService


@Injectable()
export class AuthService {
    // Constructor for AuthService
    // Purpose: Injects the User repository, JWT service, and Config service for handling auth logic
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    // Method: validateUser
    // Parameters:
    // - username: The username provided by the user
    // - pass: The raw password provided by the user
    // Returns: The user object without password if credentials are valid, otherwise null
    // Purpose: Checks whether the given credentials match a user in the database
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    // Method: login
    // Parameters:
    // - username: The username entered by the user
    // - password: The password entered by the user
    // Returns: An object containing a JWT access token and user details (excluding password)
    // Throws: UnauthorizedException if credentials are invalid
    // Purpose: Authenticates a user and generates a JWT token for authorized sessions
    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.configService.get<string>('SECRET_KEY'),
            }),
            user
        };
    }

    // Method: signUp
    // Parameters:
    // - signUpDto: An object containing username, password, firstName, and lastName
    // Returns: An object containing a JWT token
    // Purpose: Creates a new user with hashed password and returns a signed JWT token
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { username, password, firstName, lastName } = signUpDto;
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
