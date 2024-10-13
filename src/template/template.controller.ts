    import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
    import {FileInterceptor} from "@nestjs/platform-express";
    import {TemplateService} from "./template.service";
    import TemplateDto from "./dto/template.dto";
    import QuestionsDto from "../questions/dto/questions.dto";

    @Controller('templates')
    export class TemplateController {

        constructor(private readonly templateService: TemplateService) {}

        @Post("/create")
        @UseInterceptors(FileInterceptor('file'))
        async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() dto: TemplateDto) {
            return await this.templateService.createTemplate(dto, file)
        }

        @Post('/add-questions/:id')
        async addQuestion(@Param('id') id: number, @Body() dto: QuestionsDto) {
            return await this.templateService.addQuestionsToTemplate(id, dto)
        }

        @Get("/questions/:id")
        async getQuestions(@Param('id') id: number) {
            return await this.templateService.getAllQuestions(id)
        }
    }


