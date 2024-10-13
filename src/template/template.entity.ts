import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Tag} from "../tag/tag.entity";


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
    @JoinColumn({name: 'user_id'})
    author: User

    @CreateDateColumn()
    created_at: Date;
}
