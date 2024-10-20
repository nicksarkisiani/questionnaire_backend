import {PartialType} from "@nestjs/swagger";

export class QuestionDto {
    type: "int" | "string" | "text" | "checkbox"
    title: string
    description: string
    state?: boolean
    answers?: string[]
}

export class UpdateQuestionDto extends PartialType(QuestionDto) {
    id: number
}

export class UpdateTopicDto  {
    id: number
}

