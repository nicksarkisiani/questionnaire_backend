import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Tag} from "../tag/tag.entity";
import {Question} from "../questions/questions.entity";


@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: false, nullable: false, type: "text"})
    title: string

    @Column({unique: false, nullable: false, type: "text"})
    description: string

    @Column({unique: false, nullable: false, type: "text"})
    topic: string

    @ManyToOne(() => Tag)
    @JoinColumn({name: 'tag_id'})
    tag: Tag;

    @Column({unique: false, nullable: true, type: "text"})
    imageURL: string

    @Column({unique: false, nullable: false, type: "boolean"})
    isPublic: boolean

    @ManyToOne(() => User)
    @JoinColumn({name: 'author_id'})
    author: User

    @OneToMany(() => Question, question => question.template_id, {cascade: true})
    @JoinColumn({name: 'question_id'})
    questions: Question[]

    @CreateDateColumn()
    created_at: Date;
}
