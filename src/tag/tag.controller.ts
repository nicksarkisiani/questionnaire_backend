import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {TagService} from "./tag.service";
import TagDto from "./dto/tag.dto";

@Controller('tags')
export class TagController {

    constructor(private readonly tagService: TagService) {}

    @Post("/create")
    async create(@Body() dto: TagDto) {
        return await this.tagService.createTag(dto)
    }

    @Get("/get-all")
    async getAll() {
        return await this.tagService.printAll()
    }
}
