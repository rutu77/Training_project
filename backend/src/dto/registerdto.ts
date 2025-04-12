import {IsNotEmpty, IsEmail, MinLength, IsString, Matches} from "class-validator"

export class RegisterDto{
    @IsNotEmpty({message:"Should not be empty"})
    @IsString({message:"Should be string"})
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name must contain only letters and spaces' })
    name:string

    @IsEmail()
    email:string
    
    @MinLength(8,{message:"minimum length should be 8"})
    password:string;

    role?:string;
}