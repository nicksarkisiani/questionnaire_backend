import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("topics")
export default class Topic {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, unique: true})
    name: string
}