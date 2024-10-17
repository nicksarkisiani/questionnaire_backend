import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import Topic from "./topic.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicsService],
  controllers: [TopicsController]
})
export class TopicsModule {}
