import {Body, Controller, Post} from '@nestjs/common';
import {QuestionTypeService} from "./question-type.service";
import QuestionTypeDto from "./dto/question-type.dto";

@Controller('question-types')
export class QuestionTypeController {
    constructor(private readonly questionTypeService: QuestionTypeService) {
    }

    @Post("/create")
    async createType(@Body() dto : QuestionTypeDto){
        return await this.questionTypeService.createType(dto)
    }
}
