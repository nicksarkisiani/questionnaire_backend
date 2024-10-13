import { Module } from '@nestjs/common';
import { QuestionTypeController } from './question-type.controller';
import { QuestionTypeService } from './question-type.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionType} from "./question-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionType])],
  controllers: [QuestionTypeController],
  providers: [QuestionTypeService],
  exports: [QuestionTypeService]
})
export class QuestionTypeModule {}
