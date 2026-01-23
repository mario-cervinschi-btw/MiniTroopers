import { Injectable, NotFoundException } from '@nestjs/common';
import { Comic } from './dto/comic.dto';
import { ComicResponse } from './dto/comic-response.dto';
import { COMICS } from './comics.mock-data';

@Injectable()
export class ComicsService {
  private buildComicResponse(comic: Comic): ComicResponse {
    const isFirstComic = comic.index === 0;
    const isLastComic = comic.index === COMICS.length - 1;

    let prev: number | null = null;

    if (!isFirstComic) {
      prev = comic.index - 1;
    }

    let next: number | null = null;
    if (!isLastComic) {
      next = comic.index + 1;
    }

    return {
      comic,
      prev,
      next,
      total: COMICS.length,
    };
  }

  getFirst(): ComicResponse {
    return this.buildComicResponse(COMICS[0]);
  }

  getLatest(): ComicResponse {
    return this.buildComicResponse(COMICS[COMICS.length - 1]);
  }

  getByNum(num: number): ComicResponse {
    const comic = COMICS.find((comic) => comic.index === num);
    if (!comic) {
      throw new NotFoundException({
        statusCode: 404,
        error: 'Not Found',
        message: `Comic ${num} not found`,
        code: 'COMIC_NOT_FOUND',
      });
    }
    return this.buildComicResponse(comic);
  }

  getRandom(): ComicResponse {
    if (COMICS.length === 0) {
      throw new NotFoundException({
        statusCode: 404,
        error: 'Not Found',
        message: 'No comics available',
        code: 'NO_COMICS_AVAILABLE',
      });
    }
    const randomIndex = Math.floor(Math.random() * COMICS.length);
    const comic = COMICS[randomIndex];

    if (!comic) {
      throw new NotFoundException({
        statusCode: 404,
        error: 'Not Found',
        message: 'Failed to retrieve random comic',
        code: 'RANDOM_COMIC_ERROR',
      });
    }

    return this.buildComicResponse(comic);
  }
}
