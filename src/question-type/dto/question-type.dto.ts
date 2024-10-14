import {ApiProperty} from "@nestjs/swagger";


export default class QuestionTypeDto {
    @ApiProperty({example: "int", description: "Type of question" })
    type: string
}