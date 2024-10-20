import {BadRequestException, Injectable} from '@nestjs/common';
import {Question} from "./question.entity";
import {QuestionDto, UpdateQuestionDto} from "./dto/question.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Template} from "../templates/template.entity";

@Injectable()
export class QuestionsService {

    constructor(@InjectRepository(Question) private readonly questionRepository: Repository<Question>) {
    }

    async createQuestion(questionDto: QuestionDto, template: Template) {
        this.checkAvailability(template, questionDto.type)
        const question = this.questionRepository.create(questionDto)
        question.template = template
        await this.questionRepository.save(question);
        return question;
    }

    checkAvailability(template: Template, type: string) {
        if (template[`${type}Count`] >= 4) {
            throw new BadRequestException(`You reach the limit for ${type} questions`)
        }
    }

    async updateQuestion(template: Template, dto: UpdateQuestionDto) {
        const question = await this.checkBelongs(template, dto.id)
        Object.assign(question, {...dto, id: +dto.id})
        return await this.questionRepository.save(question);
    }

    async checkBelongs(template, questionId: number) {
        const question = await this.findOneById(questionId)
        if (question.template.id !== template.id) throw new BadRequestException(`This question does not belong to template`)
        return question;
    }

    async findOneById(id: number) {
        if(!id) throw new BadRequestException(`Incorrect question id`);
        const question = await this.questionRepository.findOne({relations: ["template"], where: {id: id}})
        if (!question) throw new BadRequestException(`Question with id ${id} does not exist`)
        return question
    }

    async deleteQuestion(template: Template,questionId: number) {
        const question = await this.checkBelongs(template, questionId)
        await this.questionRepository.delete(question.id)
        return question;
    }
}

