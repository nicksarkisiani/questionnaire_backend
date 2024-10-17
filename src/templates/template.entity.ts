import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "../users/user.entity";
import Topic from "../topics/topic.entity";
import Tag from "../tags/tag.entity";
import {Question} from "../questions/question.entity";

@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: false, nullable: false, default: "Untitled"})
    title: string

    @Column({unique: false, nullable: false, type: "text", default: "Description"})
    description: string

    @ManyToOne(() => Topic, {eager: true})
    @JoinColumn({name: 'topic_id'})
    topic: Topic

    @ManyToMany(() => Tag, (tag) => tag.templates, {eager: true})
    @JoinTable({name: 'template_tags'})
    tags: Tag[];

    @Column({unique: false, nullable: true})
    imageURL: string

    @Column({unique: false, nullable: false, type: "boolean", default: false})
    isPublic: boolean

    @ManyToOne(() => User)
    @JoinColumn({name: 'author_id'})
    author: User

    @CreateDateColumn()
    created_at: Date;

    @Column({nullable: false, type: "int", default: 0})
    intCount: number

    @Column({nullable: false, type: "int", default: 0})
    stringCount: number

    @Column({nullable: false, type: "int", default: 0})
    textCount: number

    @Column({nullable: false, type: "int", default: 0})
    checkboxCount: number

    @OneToMany(() => Question, (question) => question.template)
    questions: Question[];
}
