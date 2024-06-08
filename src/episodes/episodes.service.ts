import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Episodes } from './episodes.model';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectModel(Episodes)
    private episodesModel: typeof Episodes,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto): Promise<Episodes> {
    return this.episodesModel.create(createEpisodeDto);
  }

  async findAll(): Promise<Episodes[]> {
    return this.episodesModel.findAll();
  }

  async findOne(id: number): Promise<Episodes> {
    return this.episodesModel.findByPk(id);
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto): Promise<[number, Episodes[]]> {
    return this.episodesModel.update(updateEpisodeDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<void> {
    const episode = await this.findOne(id);
    await episode.destroy();
  }
}
