import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto'
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episodes } from './episodes.model';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  async create(@Body() createEpisodeDto: CreateEpisodeDto): Promise<Episodes> {
    return this.episodesService.create(createEpisodeDto);
  }

  @Get()
  async findAll(): Promise<Episodes[]> {
    return this.episodesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Episodes> {
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
    }
    return episode;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<[number, Episodes[]]> {
    const [updatedCount, [updatedEpisode]] = await this.episodesService.update(id, updateEpisodeDto);
    if (updatedCount === 0) {
      throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
    }
    return [updatedCount, [updatedEpisode]];
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.episodesService.remove(id);
  }
}
