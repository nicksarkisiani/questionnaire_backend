import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Response,
    Request,
    Patch
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {TemplateService} from "./template.service";
import TemplateDto, {UpdateTemplateDto} from "./dto/template.dto";
import QuestionsDto from "../questions/dto/questions.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('templates')
export class TemplateController {

    constructor(private readonly templateService: TemplateService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    @UseInterceptors(FileInterceptor('file'))
    async createTemplate(@Request() req,@UploadedFile() file: Express.Multer.File, @Body() dto: TemplateDto) {
        return await this.templateService.createTemplate(dto, file, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getTemplate(@Param('id') id: number, @Request() req) {
        return await this.templateService.getTemplate(id, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/:id")
    async patchInformation(@Param('id') id: number, @Request() req, @Body() dto: UpdateTemplateDto) {
        return await this.templateService.patchInformation(id, req.user, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add-questions/:id')
    async addQuestion(@Param('id') id: number, @Body() dto: QuestionsDto) {
        return await this.templateService.addQuestionsToTemplate(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/questions/:id")
    async getQuestions(@Param('id') id: number) {
        return await this.templateService.getAllQuestions(id)
    }
}


