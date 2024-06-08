import { Module, forwardRef } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Episodes } from './episodes.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Episodes]), forwardRef(() => AuthModule)],
  providers: [EpisodesService],
  controllers: [EpisodesController],
  exports: [EpisodesService]
})
export class EpisodesModule {}
