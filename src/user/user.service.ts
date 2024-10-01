import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {registrationDto} from "../auth/dto/registration.dto";
import {encodePassword} from "../utils/bcrypt";
import {RoleService} from "../role/role.service";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly roleService: RoleService ) {
    }

    async createUser(dto: registrationDto) {
        await this.checkExisting(dto.email, dto.username)
        const hashPassword = encodePassword(dto.password)
        let user = this.userRepository.create({...dto, password: hashPassword})
        user = await this.roleService.giveUserRole(user)
        await this.userRepository.save(user)
        return user;
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({email})
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOneBy({username})
    }

    async checkExisting(email: string, username: string): Promise<void> {
        const candidateEmail = await this.findUserByEmail(email);
        const candidateUsername = await this.findUserByUsername(username);
        if(candidateEmail){
            throw new UnauthorizedException("Email already exists");
        }
        if(candidateUsername){
            throw new UnauthorizedException("Username already exists");
        }
    }
}
