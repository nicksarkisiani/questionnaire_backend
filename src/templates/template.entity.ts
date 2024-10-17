import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToOne,
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

    @Column({unique: false, nullable: false})
    title: string

    @Column({unique: false, nullable: false, type: "text"})
    description: string

    @ManyToOne(() => Topic, { eager: true })
    @JoinColumn({ name: 'topic_id' })
    topic: Topic

    @ManyToMany(() => Tag, (tag) => tag.templates, { eager: true })
    @JoinTable({ name: 'template_tags' })
    tags: Tag[];

    @Column({unique: false, nullable: true})
    imageURL: string

    @Column({unique: false, nullable: false, type: "boolean"})
    isPublic: boolean

    @ManyToOne(() => User)
    @JoinColumn({name: 'author_id'})
    author: User

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => Question, question => question.template, {eager: true})
    @JoinColumn({ name: 'question_id' })
    question: Question
}
