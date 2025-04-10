import {IsNotEmpty, IsEmail, MinLength, IsString, Matches} from "class-validator"
export class RegisterDto{
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name must contain only letters and spaces' })
    name:string

    @IsEmail()
    email:string
    
    @MinLength(8)
    password:string;

    role?:string;
}