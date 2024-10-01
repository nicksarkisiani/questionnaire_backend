import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {registrationDto} from "./dto/registration.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("/registration")
    async registration(@Body() dto: registrationDto) {
        return await this.authService.registration(dto)
    }
}
