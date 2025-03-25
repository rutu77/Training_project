import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"tbl_User_47"})
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({default:'user'})
    role:string;
}