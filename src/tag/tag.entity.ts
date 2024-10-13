import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false, unique: true })
    name: string;
}