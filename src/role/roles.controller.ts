import {Body, Controller, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {RoleDto} from "./dto/role.dto";

@Controller('role')
export class RolesController {

    constructor(private readonly roleService: RolesService) {}

    @Post("/create")
    async createRole(@Body() dto: RoleDto ){
        return await this.roleService.create(dto)
    }
}
