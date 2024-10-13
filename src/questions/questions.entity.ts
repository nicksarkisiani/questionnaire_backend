import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionType} from "../question-type/question-type.entity";

@Entity('question')
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text", nullable: false, unique: false})
    question: string;

    @ManyToOne(() => QuestionType)
    @JoinColumn({name: "question-type_id"})
    type: QuestionType;

    @Column({type: "boolean", nullable: false, unique: false})
    state: boolean;

    @Column({ type: 'int', nullable: false })
    template_id: number;
}
