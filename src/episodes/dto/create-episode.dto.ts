import { ApiProperty } from '@nestjs/swagger';

export class CreateEpisodeDto {
  @ApiProperty({
    example: 1,
    description: 'Episode number',
  })
  episode_number: number;

  @ApiProperty({
    example: 'The end',
    description: 'Episode title',
  })
  title: string;

  @ApiProperty({
    example: 'onva.mp3',
    description: 'Episode file path',
  })
  episode_path: string;

  @ApiProperty({
    example: 1,
    description: 'Anime ID',
  })
  anime_id: number;
}
