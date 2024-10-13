import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import TemplateDto from "./dto/template.dto";
import {Repository} from "typeorm";
import {Template} from "./template.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {TagService} from "../tag/tag.service";
import QuestionsDto from "../questions/dto/questions.dto";
import {QuestionsService} from "../questions/questions.service";

@Injectable()
export class TemplateService {

    constructor(private readonly cloudinary: CloudinaryService,
                @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
                private readonly tagService: TagService,
                private readonly questionService: QuestionsService
    ) {}
    async uploadImageToCloudinary(file: Express.Multer.File) {
        const data =  await this.cloudinary.uploadFile(file).catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
        return data.url
    }

    async createTemplate(dto: TemplateDto, file: Express.Multer.File) {
        let template = this.templateRepository.create(dto)
        let imagePath: string | null = null
        if(file) {
            imagePath = await this.uploadImageToCloudinary(file)
        }
        template = await this.tagService.attachTag(template, dto.tag_id)
        if(!dto.isPublic) template.isPublic = true
        template.imageURL = imagePath
        await this.templateRepository.save(template)
        return template
    }

    async findById(id: number) {
        return await this.templateRepository.findOneBy({id})
    }

    async addQuestionsToTemplate(id: number, dto: QuestionsDto) {
        const template = await this.findById(id)
        if(!template) {
            throw new NotFoundException(`Template ${id} isn't exists`)
        }
        template.questions =  await this.questionService.createQuestions(template, dto)
        return template
    }

    async getAllQuestions(id: number) {
        const template = await this.findById(id)
        if(!template) {
            throw new NotFoundException(`Template ${id} isn't exists`)
        }
        return await this.questionService.findAllQuestions(id)
    }
}

