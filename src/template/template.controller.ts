    import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
    import {FileInterceptor} from "@nestjs/platform-express";
    import {TemplateService} from "./template.service";
    import {TemplateDto} from "./dto/template.dto";

    @Controller('templates')
    export class TemplateController {

        constructor(private readonly templateService: TemplateService) {}

        @Post("/create")
        @UseInterceptors(FileInterceptor('file'))
        async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() dto: TemplateDto) {
            return await this.templateService.createTemplate(dto, file)
        }
    }


