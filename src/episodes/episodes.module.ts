import { Module } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Episodes } from './episodes.model';

@Module({
  imports: [ SequelizeModule.forFeature([Episodes]),],
  providers: [EpisodesService],
  controllers: [EpisodesController],
  exports: [EpisodesService]
})
export class EpisodesModule {}
