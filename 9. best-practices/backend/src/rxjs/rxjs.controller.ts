import { Controller, Get } from '@nestjs/common';
import { RxjsService } from './rxjs.service';
import { FlowchartNode, RxjsQuiz, RxjsTopic } from './rxjs.types';

@Controller('rxjs')
export class RxjsController {
  constructor(private readonly rxjsService: RxjsService) {}

  @Get('topics')
  getTopics(): RxjsTopic[] {
    return this.rxjsService.getTopics();
  }

  @Get('quizzes')
  getQuizzes(): RxjsQuiz[] {
    return this.rxjsService.getQuizzes();
  }

  @Get('flowchart')
  getFlowchart(): FlowchartNode[] {
    return this.rxjsService.getFlowchart();
  }
}
