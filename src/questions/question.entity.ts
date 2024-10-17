import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Template} from "../templates/template.entity";

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    title: string;

    @Column({nullable:false})
    description: string;

    @Column({nullable:false})
    type: string

    @Column({nullable:false, type: "boolean", default: false})
    state: boolean

    @Column("text", {nullable:true, array: true})
    answers: string[]

    @ManyToOne(() => Template)
    @JoinColumn({name: 'template_id'})
    template: Template;
}