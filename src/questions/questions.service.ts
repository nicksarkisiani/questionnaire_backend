import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Question} from "./questions.entity";
import {Repository} from "typeorm";
import QuestionsDto, {QuestionDto} from "./dto/questions.dto";
import {Template} from "../template/template.entity";
import {TagService} from "../tag/tag.service";
import {QuestionTypeService} from "../question-type/question-type.service";

@Injectable()
export class QuestionsService {

    constructor(@InjectRepository(Question) private readonly questionRepository: Repository<Question>,
                private readonly questionTypeService: QuestionTypeService,) {
    }

    async createQuestion(questionDto: QuestionDto, template: Template){
        const question = this.questionRepository.create(questionDto)
        question.type = await this.questionTypeService.findById(questionDto.type_id)
        question.template_id = template.id
        await this.questionRepository.save(question)
        return question
    }

    async createQuestions(template: Template, dto: QuestionsDto){
        const questions = dto.questions.map( async (question) => await this.createQuestion(question, template))
        return await Promise.all(questions)
    }

    async findAllQuestions(template_id: number) {
        return await this.questionRepository.findBy({template_id})
    }
}
