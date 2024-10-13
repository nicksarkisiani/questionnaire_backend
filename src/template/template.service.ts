import {BadRequestException, Injectable} from '@nestjs/common';
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import {TemplateDto} from "./dto/template.dto";
import {Repository} from "typeorm";
import {Template} from "./template.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {TagService} from "../tag/tag.service";

@Injectable()
export class TemplateService {

    constructor(private readonly cloudinary: CloudinaryService,
                @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
                private readonly tagService: TagService) {}
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
}

