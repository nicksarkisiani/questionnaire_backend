import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import TemplateDto, {UpdateTemplateDto} from "./dto/template.dto";
import {Repository} from "typeorm";
import {Template} from "./template.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {TagService} from "../tag/tag.service";
import QuestionsDto from "../questions/dto/questions.dto";
import {QuestionsService} from "../questions/questions.service";
import {User} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class TemplateService {

    constructor(private readonly cloudinary: CloudinaryService,
                @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
                private readonly tagService: TagService,
                private readonly questionService: QuestionsService,
                private readonly  userService: UserService,
    ) {}
    async uploadImageToCloudinary(file: Express.Multer.File) {
        const data =  await this.cloudinary.uploadFile(file).catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
        return data.url
    }

    async createTemplate(dto: TemplateDto, file: Express.Multer.File, reqUser: User): Promise<Template> {
        try {
            let template = this.templateRepository.create(dto)
            let imagePath: string | null = null
            if(file) {
                imagePath = await this.uploadImageToCloudinary(file)
            }
            if(dto.tag_id) template = await this.tagService.attachTag(template, dto.tag_id)
            if(!dto.isPublic) template.isPublic = true
            template.imageURL = imagePath
            template.author = await this.userService.findUserById(reqUser.id)
            await this.templateRepository.save(template)
            return {
                ...template,
                author: reqUser
            }
        } catch (e) {
            throw new BadRequestException(e.detail)
        }

    }

    async findById(id: number) {
        return await this.templateRepository.findOneBy({id})
    }

    async addQuestionsToTemplate(id: number, dto: QuestionsDto) {
        try {
            const template = await this.findById(id)
            if(!template) {
                throw new NotFoundException(`Template ${id} isn't exists`)
            }
            template.questions =  await this.questionService.createQuestions(template, dto)
            return template
        } catch (e) {
            throw new BadRequestException(e.detail)
        }

    }

    async getAllQuestions(id: number) {
        const template = await this.findById(id)
        if(!template) {
            throw new NotFoundException(`Template ${id} isn't exists`)
        }
        return await this.questionService.findAllQuestions(id)
    }

    async getTemplate(id: number, user: User) {
       const template = await this.checkExistingAndPermission(id, user)
        return {
            ...template,
            author: user
        }
    }

    async checkExistingAndPermission(id: number, user: User) {
        const template = await this.templateRepository.findOne({
            where: {id},
            relations: ["author"]
        })
        if(!template) {
            throw new NotFoundException(`Template ${id} isn't exists`)
        }
        if(template.author.id !== user.id) {
            throw new ForbiddenException(`You don't have permission`)
        }
        return {
            ...template,
            author: user
        }
    }

    async patchInformation(id: number, user: User, updateDto: UpdateTemplateDto) {
        const template = await this.checkExistingAndPermission(id, user)
        Object.assign(template, updateDto)
        await this.templateRepository.save(template)
        return template
    }

    async patchImage(id: number, user: User, file: Express.Multer.File) {
        const template = await this.checkExistingAndPermission(id, user)
        if(file) {
            template.imageURL = await this.uploadImageToCloudinary(file)
        }
        await this.templateRepository.save(template)
        return template
    }

    async getAllTemplates(candidate: User) {
        const user = await this.userService.findUserById(candidate.id)
        if(!user) {
            throw new NotFoundException("User is not found")
        }
        const templates = await this.templateRepository.findBy({author: user})
        return templates
    }
}

