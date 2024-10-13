import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('question-type')
export class QuestionType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text", nullable: false, unique: true})
    type: string
}