import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
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

    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role: Role;

    @Column({type: 'varchar', nullable: true})
    refreshToken: string
}