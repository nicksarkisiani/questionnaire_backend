import {ApiProperty} from "@nestjs/swagger";
import QuestionTypeDto from "../../question-type/dto/question-type.dto";

export class QuestionDto {
    @ApiProperty({example: "What is your question?", description: "Question" })
    question: string
    @ApiProperty({example: "4", description: "Type of question(single-line, multi-line...)" })
    type_id: number
    @ApiProperty({example: "false", description: "State" })
    state: boolean
}

export default class QuestionsDto {
    @ApiProperty({
        example: `${
            JSON.stringify([{
                question: "What is your question?",
                type_id: 1,
                state: false
            },])
        }`, description: "Example of question"
    })
    questions: QuestionDto[]
}