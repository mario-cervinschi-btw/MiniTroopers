import { Injectable } from '@nestjs/common';
import { SignalsRepository } from './signals.repository';
import { SignalsQuiz, SignalsTopic } from './signals.types';

@Injectable()
export class SignalsService {
  constructor(private readonly signalsRepository: SignalsRepository) {}

  getTopics(): SignalsTopic[] {
    return this.signalsRepository.findAllTopics();
  }

  getQuizzes(): SignalsQuiz[] {
    return this.signalsRepository.findAllQuizzes();
  }
}
