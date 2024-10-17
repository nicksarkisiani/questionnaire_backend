import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {CloudinaryService} from "../cloudinary/cloudinary.service";
import {UpdateTemplateDto} from "./dto/template.dto";
import {Repository} from "typeorm";
import {Template} from "./template.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {UsersService} from "../users/users.service";
import {QuestionDto} from "../questions/dto/question.dto";
import {QuestionsService} from "../questions/questions.service";

@Injectable()
export class TemplatesService {

    constructor(private readonly cloudinary: CloudinaryService,
                @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
                private readonly  userService: UsersService,
                private readonly questionsService: QuestionsService,
    ) {}

    async uploadImageToCloudinary(file: Express.Multer.File) {
        const data =  await this.cloudinary.uploadFile(file).catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
        return data.url
    }


    async findById(id: number) {
        return await this.templateRepository.findOneBy({id})
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
            relations: ["author", "tags", "topic"]
        })
        if(!template) {
            throw new NotFoundException(`Template ${id} isn't exists`)
        }
        console.log(template, user )
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
        return await this.templateRepository.findBy({author: user})
    }

    async createQuestion(user: User,templateId: number, questionDto: QuestionDto) {
        const template = await this.checkExistingAndPermission(templateId, user)
        template.question = await this. questionsService.updateQuestions(template.question, questionDto)
        await this.templateRepository.save(template)
        return template
    }

    async createEmptyTemplate(user: User) {
        const template = this.templateRepository.create()
        template.title = "Untitled"
        template.description = "Description"
        template.isPublic = false
        template.question = await this.questionsService.initializeQuestionEntity()
        template.author = await this.userService.findUserById(user.id)
        await this.templateRepository.save(template)
        return {
            ...template,
            author: user
        }
    }
}

