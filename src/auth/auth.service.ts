import { Injectable } from '@nestjs/common';
import {registrationDto} from "./dto/registration.dto";
import {UserService} from "../user/user.service";
import {comparePassword} from "../utils/bcrypt";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async registration(dto: registrationDto): Promise<any> {
        return await this.userService.createUser(dto)
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);
        if(user && comparePassword(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null
    }
}
