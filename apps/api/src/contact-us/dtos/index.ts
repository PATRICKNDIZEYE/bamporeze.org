import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NewMessageDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    message: string;
}