import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../environments/environments';
import { SignalsQuiz, SignalsTopic } from '../models/signals.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  private readonly http = inject(HttpClient);

  readonly apiBaseUrl = API_BASE_URL + '/signals';

  fetchTopics(): Observable<SignalsTopic[]> {
    return this.http.get<SignalsTopic[]>(`${this.apiBaseUrl}/topics`);
  }

  fetchQuizzes(): Observable<SignalsQuiz[]> {
    return this.http.get<SignalsQuiz[]>(`${this.apiBaseUrl}/quizzes`);
  }
}
