import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import Tag from "./tag.entity";
import {Repository} from "typeorm";

@Injectable()
export class TagsService {

    constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {
    }
    
    async onModuleInit() {

    }

}
