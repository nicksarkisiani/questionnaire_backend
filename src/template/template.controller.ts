import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, Response, Request} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {TemplateService} from "./template.service";
import TemplateDto from "./dto/template.dto";
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


