import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Role} from "./role.entity";
import {RoleDto} from "./dto/role.dto";

@Injectable()
export class RoleService {

    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    }

    async create(dto: RoleDto) {
        await this.checkExists(dto.name)
        const role = this.roleRepository.create(dto);
        await this.roleRepository.save(dto);
        return role;
    }

    async checkExists(name: string): Promise<void> {
        const candidate = await this.roleRepository.findOneBy({name})
        if (candidate) {
            throw new UnauthorizedException("Role already exists!")
        }
    }
}
