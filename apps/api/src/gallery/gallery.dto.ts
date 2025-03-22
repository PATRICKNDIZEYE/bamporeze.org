import { IsString, MaxLength, MinLength } from "class-validator"

export class GalleryDto {
    @IsString()
    @MinLength(2)
    title: string


    @IsString()
    @MinLength(2)
    @MaxLength(120)
    description?: string

    @IsString()
    @MinLength(2)
    image: string
}