import {IsNumber} from "class-validator";

export class AddAnimeDto {
    readonly animeId: string;

    readonly title: string;
}