import { Body, Controller, Get, Post } from '@nestjs/common';
import { createAnimeDto } from './dto/create-anime.dto';
import { AnimesService } from './animes.service';

@Controller('animes')
export class AnimesController {

    constructor(private animeService: AnimesService) {

    }

    @Post()
    createAnime(@Body() dto: createAnimeDto) {
        return this.animeService.create(dto)
    }
    

    // @Get()
    // getAnimesByUserId(@Body() userId: number) {
    //     return this.animeService.getAnimesByUserId(userId)
    // }

    @Get()
    getAll() {
        return this.animeService.getAll()
    }

}
