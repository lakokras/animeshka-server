import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEpisodeDto {
  @ApiPropertyOptional({
    example: 2,
    description: 'Episode number',
  })
  episode_number?: number;

  @ApiPropertyOptional({
    example: 'The Final Episode',
    description: 'Episode title',
  })
  title?: string;

  @ApiPropertyOptional({
    example: 'onva_new.mp3',
    description: 'Episode file path',
  })
  episode_path?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Anime ID',
  })
  anime_id?: number;
}
