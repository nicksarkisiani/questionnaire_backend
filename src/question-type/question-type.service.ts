import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import QuestionTypeDto from "./dto/question-type.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionType} from "./question-type.entity";
import {Repository} from "typeorm";

@Injectable()
export class QuestionTypeService {
    constructor(@InjectRepository(QuestionType) private readonly questionTypeRepository: Repository<QuestionType>) {
    }

    async createType (dto: QuestionTypeDto)  {
        const candidate = await this.findByName(dto.type);
        if(candidate){
            throw new BadRequestException("Question type already exists");
        }
        const type = this.questionTypeRepository.create(dto)
        await this.questionTypeRepository.save(dto);
        return type;
    }

    async findByName (type: string) {
        return await this.questionTypeRepository.findOneBy({type})
    }

    async findById(id: number) {
        const candidate = await this.questionTypeRepository.findOneBy({id})
        if(!candidate){
            throw new NotFoundException({message: `Question type with id ${id} is not exists`})
        }
        return candidate
    }
}
