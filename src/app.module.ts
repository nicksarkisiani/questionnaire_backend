import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import * as process from "node:process";

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
            entities: [],
            synchronize: true,
            database: process.env.DB_NAME,
            ssl: !!+process.env.DB_SSL
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}




