import { Injectable } from '@nestjs/common';
import { RxjsRepository } from './rxjs.repository';
import { FlowchartNode, RxjsQuiz, RxjsTopic } from './rxjs.types';

@Injectable()
export class RxjsService {
  constructor(private readonly rxjsRepository: RxjsRepository) {}

  getTopics(): RxjsTopic[] {
    return this.rxjsRepository.findAllTopics();
  }

  getQuizzes(): RxjsQuiz[] {
    return this.rxjsRepository.findAllQuizzes();
  }

  getFlowchart(): FlowchartNode[] {
    return this.rxjsRepository.findFlowchartNodes();
  }
}
