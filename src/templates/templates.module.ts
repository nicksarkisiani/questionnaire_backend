import {forwardRef, Module} from '@nestjs/common';
import {TemplatesController} from './templates.controller';
import {TemplatesService} from './templates.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Template} from "./template.entity";
import {CloudinaryModule} from "../cloudinary/cloudinary.module";
import {UsersModule} from "../users/users.module";
import {QuestionsModule} from "../questions/questions.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Template]),
        CloudinaryModule,
        UsersModule,
        QuestionsModule
    ],
    controllers: [TemplatesController],
    providers: [TemplatesService],
    exports: [TemplatesService]
})
export class TemplatesModule {
}
