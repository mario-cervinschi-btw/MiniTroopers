import { ApiProperty } from '@nestjs/swagger';
import { Comic } from './comic.dto';

export class ComicResponse {
  @ApiProperty({ type: Comic })
  comic: Comic;

  @ApiProperty({
    example: 41,
    nullable: true,
    description: 'Previous comic number, or null if this is the first',
  })
  prev: number | null;

  @ApiProperty({
    example: 21,
    nullable: true,
    description: 'Next comic number, or null if this is the last',
  })
  next: number | null;

  @ApiProperty({ example: 50, description: 'Total number of comics available' })
  total: number;
}
