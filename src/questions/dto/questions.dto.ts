export class QuestionDto {
    question: string
    type_id: number
    state: boolean
}

export default class QuestionsDto {
    questions: QuestionDto[]
}