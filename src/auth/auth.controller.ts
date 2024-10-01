import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {loginDto, registrationDto} from "./dto/registration.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("/registration")
    async registration(@Body() dto: registrationDto) {
        return await this.authService.registration(dto)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}

