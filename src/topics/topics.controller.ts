import {Controller, Get, Inject, Param, UseGuards} from '@nestjs/common';
import {TopicsService} from "./topics.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('topics')
export class TopicsController {

    constructor(@Inject() private readonly topicsService: TopicsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("/all")
    async getAllTopics() {
        return this.topicsService.getTopics()
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getTopic(@Param('id') id: number) {
        return this.topicsService.getTopicById(id)
    }
}
