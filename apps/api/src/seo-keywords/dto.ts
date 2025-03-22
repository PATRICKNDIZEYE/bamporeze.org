import { IsString, MinLength } from "class-validator";

export class SeoWordDto {

    @IsString()
    @MinLength(2)
    word: string
}