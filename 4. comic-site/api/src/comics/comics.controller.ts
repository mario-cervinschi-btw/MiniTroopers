import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ComicsService } from './comics.service';
import { ComicResponse } from './dto/comic-response.dto';

@ApiTags('comics')
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get()
  @ApiQuery({
    name: 'position',
    enum: ['first', 'latest', 'random'],
    required: false,
    description: 'Get comic by position. Defaults to latest if not specified.',
  })
  @ApiOkResponse({ type: ComicResponse })
  getComic(@Query('position') position: string): ComicResponse {
    if (position) {
      const validPositions = ['first', 'latest', 'random'];
      if (!validPositions.includes(position)) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `Invalid position value. Must be one of: ${validPositions.join(', ')}`,
          code: 'INVALID_POSITION',
        });
      }
    }

    if (position === 'first') {
      return this.comicsService.getFirst();
    }
    if (position === 'random') {
      return this.comicsService.getRandom();
    }
    // Default to latest
    return this.comicsService.getLatest();
  }

  @Get(':index')
  @ApiParam({ name: 'index', type: Number, example: 0 })
  @ApiOkResponse({ type: ComicResponse })
  getByNum(@Param('index') index: string): ComicResponse {
    const parsed = Number.parseInt(index, 10);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed) || parsed < 0) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Comic number must be a non-negative integer',
        code: 'INVALID_COMIC_NUMBER',
      });
    }
    return this.comicsService.getByNum(parsed);
  }
}
