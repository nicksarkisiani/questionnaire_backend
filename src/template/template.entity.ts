import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";


@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: false, nullable: false, type: "varchar"})
    title: string

    @Column({unique: false, nullable: false, type: "varchar"})
    description: string

    @Column({unique: false, nullable: false, type: "varchar"})
    topic: string

    @Column({unique: false, nullable: true, type: "varchar"})
    imageURL: string

    @Column({unique: false, nullable: false, type: "boolean"})
    isPublic: boolean

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    author: User

    @CreateDateColumn()
    created_at: Date;
}