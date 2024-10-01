import {Body, Controller, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {RoleDto} from "./dto/role.dto";

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService) {}

    @Post("/create")
    async createRole(@Body() dto: RoleDto ){
        return await this.roleService.create(dto)
    }
}
