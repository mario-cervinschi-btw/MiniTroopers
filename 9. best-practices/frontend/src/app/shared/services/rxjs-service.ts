import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../environments/environments';
import { RxjsQuiz, RxjsTopic } from '../models/rxjs.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RxjsService {
  private readonly http = inject(HttpClient);

  readonly apiBaseUrl = API_BASE_URL + '/rxjs';

  fetchTopics(): Observable<RxjsTopic[]> {
    return this.http.get<RxjsTopic[]>(`${this.apiBaseUrl}/topics`);
  }

  fetchQuizzes(): Observable<RxjsQuiz[]> {
    return this.http.get<RxjsQuiz[]>(`${this.apiBaseUrl}/quizzes`);
  }
}
