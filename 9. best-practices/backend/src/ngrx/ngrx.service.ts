import { Injectable } from '@nestjs/common';
import { NgrxRepository } from './ngrx.repository';
import { NgrxFlowStep, NgrxQuiz, NgrxTopic } from './ngrx.types';

@Injectable()
export class NgrxService {
  constructor(private readonly ngrxRepository: NgrxRepository) {}

  getTopics(): NgrxTopic[] {
    return this.ngrxRepository.findAllTopics();
  }

  getQuizzes(): NgrxQuiz[] {
    return this.ngrxRepository.findAllQuizzes();
  }

  getFlowSteps(): NgrxFlowStep[] {
    return this.ngrxRepository.findFlowSteps();
  }
}
