import { ApiProperty } from '@nestjs/swagger';

export class Comic {
  @ApiProperty({ example: 1, description: 'Comic number (unique index)' })
  index: number;

  @ApiProperty({ example: 'Barrel - Part 1' })
  title: string;

  @ApiProperty({
    example: "This is a picture of a barrel.",
    description: 'Alt-text for the comic',
  })
  alt: string;

  @ApiProperty({
    example: 'https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg',
    description: 'Comic image URL',
  })
  imgUrl: string;
}
