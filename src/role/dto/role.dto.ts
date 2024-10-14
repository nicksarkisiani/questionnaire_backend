import {ApiProperty} from "@nestjs/swagger";


export class RoleDto {
    @ApiProperty({example: "user", description: "Role name" })
    name: string
}