

export class QuestionDto {
    index: number
    type: "int" | "string" | "text" | "checkbox"
    question: string
    state?: boolean
    answers?: string[]
}