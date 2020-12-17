import {Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, Column} from "typeorm";

import {MinLength, IsNotEmpty} from 'class-validator';

import * as bcrypt from 'bcryptjs';

@Entity()

// To Do IsEmail
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    @MinLength(6)
    email: string;

    @Column()
    @MinLength(6)
    password: string;

    @Column()
    @CreateDateColumn()
    CreatedAt: Date;


    @Column()
    @UpdateDateColumn()
    UpdateAt: Date;


    hashPassword(): void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt)
    };

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }
        

}

export default User;

