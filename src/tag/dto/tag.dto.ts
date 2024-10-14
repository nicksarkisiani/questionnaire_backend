import {ApiProperty} from "@nestjs/swagger";


export default class TagDto {
    @ApiProperty({example: "Math", description: "Tag name" })
    name: string
}