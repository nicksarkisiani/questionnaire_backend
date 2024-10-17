import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Template} from "../templates/template.entity";


@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Template, (template) => template.id)
    @JoinColumn({name: "template_id"})
    template: Template;


    // strings
    @Column({nullable: true, type: "boolean"})
    custom_string1_state: boolean

    @Column({nullable: true})
    custom_string1_question: string

    @Column({nullable: true, type: "boolean"})
    custom_string2_state: boolean

    @Column({nullable: true})
    custom_string2_question: string

    @Column({nullable: true, type: "boolean"})
    custom_string3_state: boolean

    @Column({nullable: true})
    custom_string3_question: string

    @Column({nullable: true, type: "boolean"})
    custom_string4_state: boolean

    @Column({nullable: true})
    custom_string4_question: string


    // text
    @Column({nullable: true, type: "boolean"})
    custom_text1_state: boolean

    @Column({nullable: true})
    custom_text1_question: string

    @Column({nullable: true, type: "boolean"})
    custom_text2_state: boolean

    @Column({nullable: true})
    custom_text2_question: string

    @Column({nullable: true, type: "boolean"})
    custom_text3_state: boolean

    @Column({nullable: true})
    custom_text3_question: string

    @Column({nullable: true, type: "boolean"})
    custom_text4_state: boolean

    @Column({nullable: true})
    custom_text4_question: string


    // int
    @Column({nullable: true, type: "boolean"})
    custom_int1_state: boolean

    @Column({nullable: true})
    custom_int1_question: string

    @Column({nullable: true, type: "boolean"})
    custom_int2_state: boolean

    @Column({nullable: true})
    custom_int2_question: string

    @Column({nullable: true, type: "boolean"})
    custom_int3_state: boolean

    @Column({nullable: true})
    custom_int3_question: string

    @Column({nullable: true, type: "boolean"})
    custom_int4_state: boolean

    @Column({nullable: true})
    custom_int4_question: string

    //checkboxes
    @Column({nullable: true, type: "boolean"})
    custom_checkbox1_state: boolean

    @Column({nullable: true})
    custom_checkbox1_question: string

    @Column("text", { array: true, nullable: true })
    custom_checkbox1_answers: string[]

    @Column({nullable: true, type: "boolean"})
    custom_checkbox2_state: boolean

    @Column({nullable: true})
    custom_checkbox2_question: string

    @Column("text", { array: true, nullable: true })
    custom_checkbox2_answers: string[]

    @Column({nullable: true, type: "boolean"})
    custom_checkbox3_state: boolean

    @Column({nullable: true})
    custom_checkbox3_question: string

    @Column("text", { array: true, nullable: true })
    custom_checkbox3_answers: string[]

    @Column({nullable: true, type: "boolean"})
    custom_checkbox4_state: boolean

    @Column({nullable: true})
    custom_checkbox4_question: string

    @Column("text", { array: true, nullable: true })
    custom_checkbox4_answers: string[]
}