import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "./questions.entity";
import {Template} from "../template/template.entity";
import {QuestionType} from "../question-type/question-type.entity";
import {QuestionTypeModule} from "../question-type/question-type.module";

@Module({
  imports: [TypeOrmModule.forFeature([Template, Question, QuestionType]), QuestionTypeModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
