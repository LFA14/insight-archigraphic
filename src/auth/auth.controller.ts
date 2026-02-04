import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Method: login
    // Route: POST /auth/login
    // Parameters:
    // - loginDto: An object containing `username` and `password`.
    // Returns: The result of the login attempt, typically a token or error message.
    // Purpose: Authenticates the user based on provided credentials.
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.username, loginDto.password);
    }

    // Method: signUp
    // Route: POST /auth/signup
    // Parameters:
    // - signUpDto: An object containing user registration details (e.g., username, password, etc.).
    // Returns: A success message or created user object after registration.
    // Purpose: Registers a new user into the system.
    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
