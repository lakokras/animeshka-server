import { Module } from '@nestjs/common';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Anime } from './animes.model';
import { User } from 'src/users/users.model';

@Module({
  controllers: [AnimesController],
  providers: [AnimesService],
  imports: [
    SequelizeModule.forFeature([User, Anime]),
  ]
})
export class AnimesModule {}
