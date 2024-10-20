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
import {QuestionDto, UpdateQuestionDto} from "../questions/dto/question.dto";
import {QuestionsService} from "../questions/questions.service";
import {TopicsService} from "../topics/topics.service";

@Injectable()
export class TemplatesService {

    constructor(private readonly cloudinary: CloudinaryService,
                @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
                private readonly  userService: UsersService,
                private readonly questionsService: QuestionsService,
                private readonly topicsService: TopicsService,
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
       const template = await this.checkExistingAndPermission(id, user, true)
        return {
            ...template,
            author: user
        }
    }

    async checkExistingAndPermission(id: number, user: User, withQuestions = true) {
        const relations = ["author", "tags", "topic"]
        withQuestions && relations.push("questions")
        const template = await this.templateRepository.findOne({
            where: {id},
            relations: relations
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
        return await this.templateRepository.findBy({author: user})
    }

    async createQuestion(user: User,templateId: number, questionDto: QuestionDto) {
        const template = await this.checkExistingAndPermission(templateId, user, false)
        const question = await this.questionsService.createQuestion(questionDto, template)
        template[`${questionDto.type}Count`]++
        await this.templateRepository.save(template)
        return question
    }

    async createEmptyTemplate(user: User) {
        const template = this.templateRepository.create()
        template.author = await this.userService.findUserById(user.id)
        await this.templateRepository.save(template)
        return {
            ...template,
            author: user
        }
    }

    async updateQuestion(user: User, id: number, dto: UpdateQuestionDto) {
        const template = await this.checkExistingAndPermission(id, user);
        return await this.questionsService.updateQuestion(template, dto)
    }

    async getTemplateWithQuestions(id: number, user: User) {
        const template = await this.checkExistingAndPermission(id, user)
        return await this.templateRepository.findOne({where: {id: template.id}, relations: ["questions"]})
    }

    async getAllQuestions(user: User, id: number) {
        const {questions} = await this.getTemplateWithQuestions(id, user)
        return questions
    }

    async updateTopic(user: User, templateId: number, topicId: number) {
        const template = await this.checkExistingAndPermission(templateId, user)
        template.topic = await this.topicsService.getTopicById(topicId)
        return await this.templateRepository.save(template)
    }
}

