import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Template} from "./template.entity";
import {CloudinaryModule} from "../cloudinary/cloudinary.module";
import {Tag} from "../tag/tag.entity";
import {User} from "../user/user.entity";
import {TagModule} from "../tag/tag.module";

@Module({
  imports: [TypeOrmModule.forFeature([Template, Tag, User]), CloudinaryModule, TagModule],
  controllers: [TemplateController],
  providers: [TemplateService]
})
export class TemplateModule {}
