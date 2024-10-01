import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../role/role.entity";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true, nullable: false})
    email: string;

    @Column({type: 'varchar', unique: true, nullable: false})
    username: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @OneToOne(() => Role)
    @JoinColumn()
    role: Role;
}