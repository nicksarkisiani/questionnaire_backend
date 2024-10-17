import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Template} from "../templates/template.entity";


@Entity("tags")
export default class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, unique: true})
    name: string

    @ManyToMany(() => Template, (template) => template.tags)
    templates: Template[];
}