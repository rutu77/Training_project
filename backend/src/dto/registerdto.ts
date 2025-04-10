import {IsNotEmpty, IsEmail, MinLength} from "class-validator"
export class RegisterDto{
    @IsNotEmpty()
    name:string

    @IsEmail()
    email:string
    
    @MinLength(8)
    password:string;

    role?:string;
}