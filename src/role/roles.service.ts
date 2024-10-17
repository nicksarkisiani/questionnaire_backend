import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Role} from "./role.entity";
import {RoleDto} from "./dto/role.dto";
import {User} from "../users/user.entity";

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    }

    async create(dto: RoleDto) {
        await this.checkExists(dto.name)
        const role = this.roleRepository.create(dto);
        await this.roleRepository.save(dto);
        return role;
    }

    async giveUserRole(user: User): Promise<User> {
        let userRole = await this.findByName("user")
        if(!userRole) {
            userRole = await this.create({name: "user"})
        }
        user.role = userRole
        return user;

    }

    async checkExists(name: string): Promise<void> {
        const candidate = await this.findByName(name)
        if (candidate) {
            throw new UnauthorizedException("Role already exists!")
        }
    }

    async findByName(name: string): Promise<Role> {
        return await this.roleRepository.findOneBy({name})
    }
}
