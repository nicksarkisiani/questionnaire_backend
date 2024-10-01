import { Injectable } from '@nestjs/common';
import {registrationDto} from "./dto/registration.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async registration(dto: registrationDto): Promise<any> {
        return await this.userService.createUser(dto)
    }
}
