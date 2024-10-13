import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {Template} from "./template.entity";
import {CloudinaryModule} from "../cloudinary/cloudinary.module";

@Module({
  imports: [TypeOrmModule.forFeature([Template, User]), CloudinaryModule],
  controllers: [TemplateController],
  providers: [TemplateService]
})
export class TemplateModule {}
