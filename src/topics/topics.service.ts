import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import Topic from "./topic.entity";
import {Repository} from "typeorm";

@Injectable()
export class TopicsService {

    constructor(@InjectRepository(Topic) private readonly topicRepository: Repository<Topic>,) {
    }

    private readonly baseTopics = ["Math", "Science", "Software Development", "World Crisis"]

    async onModuleInit() {
        this.baseTopics.map(async (topic) => {
            if (!await this.checkExisting(topic)) {
                const topicEntity = this.topicRepository.create({name: topic})
                return await this.topicRepository.save(topicEntity)
            }

        })
    }

    async getTopics() {
        return await this.topicRepository.find()
    }

    async getTopicById(id: number) {
        const topic = await this.topicRepository.findOneBy({id})
        if (!topic) throw new NotFoundException(`Topic with id ${id} not found`)
        return topic
    }

    async checkExisting(name: string) {
        return await this.topicRepository.findOneBy({name})
    }
}
