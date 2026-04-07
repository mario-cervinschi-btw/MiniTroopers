import { Controller, Get } from '@nestjs/common';
import { NgrxService } from './ngrx.service';
import { NgrxFlowStep, NgrxQuiz, NgrxTopic } from './ngrx.types';

@Controller('ngrx')
export class NgrxController {
  constructor(private readonly ngrxService: NgrxService) {}

  @Get('topics')
  getTopics(): NgrxTopic[] {
    return this.ngrxService.getTopics();
  }

  @Get('quizzes')
  getQuizzes(): NgrxQuiz[] {
    return this.ngrxService.getQuizzes();
  }

  @Get('flow')
  getFlowSteps(): NgrxFlowStep[] {
    return this.ngrxService.getFlowSteps();
  }
}
