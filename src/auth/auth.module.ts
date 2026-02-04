import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    // Imports: Array of modules to be used in this module
    imports: [
        TypeOrmModule.forFeature([User]), // Register User entity for use with TypeOrm
        UsersModule, // Import UsersModule if needed for user-related logic
        PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport JWT strategy
        JwtModule.registerAsync({
            imports: [ConfigModule], // Ensure ConfigModule is imported for async factory
            inject: [ConfigService], // Inject ConfigService to access environment variables
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // Fetch the secret key from environment
                signOptions: { expiresIn: '1h' }, // Set expiration time for JWT
            }),
        }),
        ConfigModule, // Import ConfigModule to load environment variables
    ],
    // Providers: Array of services and strategies to be used within the module
    providers: [AuthService, JwtStrategy], // Register JwtStrategy and AuthService
    // Controllers: Array of controllers to handle incoming requests
    controllers: [AuthController], // Register AuthController
    // Exports: Services and modules to be used in other modules
    exports: [AuthService, JwtModule, PassportModule], // Export services for use in other modules
})
export class AuthModule { }
