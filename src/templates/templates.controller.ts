import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Request,
    Patch, Res
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {TemplatesService} from "./templates.service";
import TemplateDto, {UpdateTemplateDto} from "./dto/template.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {IRequest} from "../types/request";
import {QuestionDto, UpdateQuestionDto, UpdateTopicDto} from "../questions/dto/question.dto";

@Controller('templates')
export class TemplatesController {

    constructor(private readonly templateService: TemplatesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    async createEmptyTemplate(@Request() req: IRequest) {
        return await this.templateService.createEmptyTemplate(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getTemplate(@Param('id') id: number, @Request() req: IRequest) {
        return await this.templateService.getTemplate(id, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async getTemplates(@Request() req: IRequest) {
        return await this.templateService.getAllTemplates(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/:id")
    async patchInformation(@Param('id') id: number, @Request() req: IRequest, @Body() dto: UpdateTemplateDto) {
        return await this.templateService.patchInformation(id, req.user, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/image/:id")
    @UseInterceptors(FileInterceptor('file'))
    async patchImage(@Param('id') id: number, @Request() req: IRequest, @UploadedFile() file: Express.Multer.File) {
        return await this.templateService.patchImage(id, req.user, file)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/create-question/:id")
    async createQuestion(@Param("id") id: number, @Request() req: IRequest, @Body() dto: QuestionDto) {
        return await this.templateService.createQuestion(req.user, id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/update-question/:id")
    async updateQuestion(@Param("id") id: number, @Request() req: IRequest, @Body() dto: UpdateQuestionDto) {
        return await this.templateService.updateQuestion(req.user, id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/update-topic/:id")
    async updateTopic(@Param("id") id: number, @Request() req: IRequest, @Body() dto: UpdateTopicDto) {
        return await this.templateService.updateTopic(req.user, id, dto.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/all-questions/:id")
    async getAllQuestions(@Param("id") id: number, @Request() req: IRequest) {
        return await this.templateService.getAllQuestions(req.user, id)
    }
}


