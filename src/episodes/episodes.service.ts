import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Episodes } from './episodes.model';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectModel(Episodes)
    private episodeModel: typeof Episodes,
  ) {}

  async createEpisode(
    file: Express.Multer.File,
    episodeNumber: number,
    animeId: number,
    title: string,
  ): Promise<Episodes> {
    return this.episodeModel.create({
      episode_number: episodeNumber,
      anime_id: animeId,
      title: title,
      episode_path: file.filename,
    });
  }

  async getEpisodes(): Promise<Episodes[]> {
    return this.episodeModel.findAll();
  }

  async getEpisodeById(id: number): Promise<Episodes> {
    return this.episodeModel.findOne({ where: { id } });
  }
}
