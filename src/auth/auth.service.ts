import {Injectable} from '@nestjs/common';
import {registrationDto} from "./dto/registration.dto";
import {UserService} from "../user/user.service";
import {comparePassword} from "../utils/bcrypt";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/user.entity";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
    }

    async registration(dto: registrationDto): Promise<any> {
        return await this.userService.createUser(dto)
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);
        if (user && comparePassword(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null
    }

    login(user: User) {
        console.log(user, process.env.SECRET_JWT)
        const payload = {
            email: user.email, sub: {
                id: user.id,
            }
        }
        return {
            accessToken: this.jwtService.sign(payload, {secret: process.env.SECRET_JWT}),
        }
    }

}
