import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createAnimeDto } from './dto/create-anime.dto';
import { Anime } from './animes.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AnimesService {
    constructor(@InjectModel(Anime) private animeRepository: typeof Anime) {}

    async create(dto: createAnimeDto) {
        console.log(dto)
        const anime = await this.animeRepository.create(dto)
        return anime
    }

    async getAll() {
        const animes = await this.animeRepository.findAll()
        return animes
    }

    async getAnimesByUserId(userId: number) {
        const animes = await this.animeRepository.findAll({where: {
           
        }})
        if (!animes) {
            throw new HttpException("Аниме у данного пользователя не найдены", HttpStatus.NOT_FOUND)
        }
        return animes
    }
    
    async getAnimeById(id: string) {
        const anime = await this.animeRepository.findOne({
            where: {
              id: id.toString()
            }
          });
        return anime
    }
}
