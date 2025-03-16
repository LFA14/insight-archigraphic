import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { SignUpDto } from './dto/signup.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.username, loginDto.password);
    }

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}