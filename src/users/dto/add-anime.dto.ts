import {IsNumber} from "class-validator";

export class AddAnimeDto {
    @IsNumber({}, {message: "Должно быть числом"})
    readonly animeId: number;

    readonly title: string;
}