import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import * as process from "node:process";
import {User} from "./user/user.entity";
import {Role} from "./role/role.entity";
import { TemplateModule } from './template/template.module';
import { QuestionsModule } from './questions/questions.module';
import {Template} from "./template/template.entity";
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TagModule } from './tag/tag.module';
import {Tag} from "./tag/tag.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
            isGlobal: true
        })
        , TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USERNAME,
            entities: [User, Role, Template, Tag],
            synchronize: true,
            database: process.env.DB_NAME,
            ssl: !!+process.env.DB_SSL
        }), AuthModule, UserModule, RoleModule, TemplateModule, QuestionsModule, CloudinaryModule, TagModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}




