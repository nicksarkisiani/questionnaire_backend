import {ApiProperty} from "@nestjs/swagger";

export default class TemplateDto {
    @ApiProperty({example: "questionnaire", description: "Title" })
    title: string
    @ApiProperty({example: "something interesting", description: "Description" })
    description: string
    @ApiProperty({example: "Math", description: "Topic" })
    topic: string
    @ApiProperty({example: "false", description: "Is public?" })
    isPublic: boolean
    @ApiProperty({example: "4", description: "Id of tag" })
    tag_id: number
}
