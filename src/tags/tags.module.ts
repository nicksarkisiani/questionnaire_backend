import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import Tag from "./tag.entity";
import {Template} from "../templates/template.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Template])],
  providers: [TagsService],
  controllers: [TagsController]
})
export class TagsModule {}
