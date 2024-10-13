    import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
    import {FileInterceptor} from "@nestjs/platform-express";
    import {TemplateService} from "./template.service";

    @Controller('template')
    export class TemplateController {

        constructor(private readonly templateService: TemplateService) {}

        @Post("/create-img")
        @UseInterceptors(FileInterceptor('file'))
        uploadImage(@UploadedFile() file: Express.Multer.File) {
            return this.templateService.uploadImageToCloudinary(file)
        }
    }
