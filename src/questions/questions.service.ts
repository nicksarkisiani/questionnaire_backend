import { Injectable } from '@nestjs/common';
import {Question} from "./question.entity";
import {QuestionDto} from "./dto/question.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class QuestionsService {

    constructor(@InjectRepository(Question) private readonly questionRepository: Repository<Question>) {
    }

    async updateQuestions(questionEntity: Question, questionDto: QuestionDto) {
        const value = `custom_${questionDto.type}${questionDto.index}`
        questionEntity[`${value}_question`] = questionDto.question
        questionEntity[`${value}_state`] = questionDto.state
        if(questionDto.type === "checkbox"){
            questionEntity[`${value}_answers`] = questionDto.answers
        }
        await this.questionRepository.save(questionEntity)
        return questionEntity
    }

    async initializeQuestionEntity ()  {
        const questionEntity = this.questionRepository.create()
        await this.questionRepository.save(questionEntity)
        return questionEntity
    }
}
