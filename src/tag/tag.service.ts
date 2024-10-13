import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import TagDto from "./dto/tag.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Tag} from "./tag.entity";
import {Repository} from "typeorm";
import {Template} from "../template/template.entity";

@Injectable()
export class TagService {

    constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {}

    async createTag(dto: TagDto) {
        const candidate = await this.findByName(dto.name)
        if(candidate) throw new BadRequestException("Tag already exists");
        const tag = this.tagRepository.create(dto)
        await this.tagRepository.save(tag)
        return tag;
    }

    async findByName(name: string) {
        return await this.tagRepository.findOneBy({name})
    }

    async findById(id: number) {
        return await this.tagRepository.findOneBy({id})
    }

    async attachTag(template: Template, tagId: number) {
        const tag = await this.findById(tagId)
        if(!tag) {
            throw new NotFoundException({message: `Tag with id ${tagId} isn't exists`})
        }
        template.tag = tag
        return template
    }

    async printAll() {
        return await this.tagRepository.find();
    }
}


