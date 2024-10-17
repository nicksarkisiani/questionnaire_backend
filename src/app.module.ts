import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './role/roles.module';
import {User} from "./users/user.entity";
import {Role} from "./role/role.entity";
import { TemplatesModule } from './templates/templates.module';
import {Template} from "./templates/template.entity";
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TagsModule } from './tags/tags.module';
import { TopicsModule } from './topics/topics.module';
import { QuestionsModule } from './questions/questions.module';
import Tag from "./tags/tag.entity";
import Topic from "./topics/topic.entity";
import {Question} from "./questions/question.entity";

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
            entities: [User, Role, Template, Tag, Topic, Question],
            synchronize: true,
            database: process.env.DB_NAME,
            ssl: !!+process.env.DB_SSL
        }), AuthModule, UsersModule, RolesModule, TemplatesModule, CloudinaryModule, TagsModule, TopicsModule, QuestionsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}




