import { Controller, Get } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { SignalsQuiz, SignalsTopic } from './signals.types';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Get('topics')
  getTopics(): SignalsTopic[] {
    return this.signalsService.getTopics();
  }

  @Get('quizzes')
  getQuizzes(): SignalsQuiz[] {
    return this.signalsService.getQuizzes();
  }
}
