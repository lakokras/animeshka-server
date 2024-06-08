import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { EpisodesService } from './episodes.service';
import { Episodes } from './episodes.model';

@Controller('episodes')
export class EpisodesController {
  constructor(private episodeService: EpisodesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createEpisode(
    @UploadedFile() file: Express.Multer.File,
    @Body('episode_number') episodeNumber: number,
    @Body('anime_id') animeId: number,
    @Body('title') title: string,
  ) {
    const episode = {
      episode_number: episodeNumber,
      anime_id: animeId,
      title: title,
      file: file
    };
  
    // Вернуть объект эпизода
    return episode;
  }

  @Get(':id')
  async getEpisode(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const episode = await this.episodeService.getEpisodeById(id);
    if (!episode) {
      res.status(404).send('Episode not found');
      return;
    }

    const filePath = `${process.cwd()}/uploads/${episode.episode_path}`;
    res.sendFile(filePath);
  }

  @Get()
  async getEpisodes(): Promise<Episodes[]> {
    return this.episodeService.getEpisodes();
  }
}
