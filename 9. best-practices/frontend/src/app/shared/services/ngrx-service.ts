import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../environments/environments';
import { NgrxQuiz, NgrxTopic } from '../models/ngrx.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgrxService {
  private readonly http = inject(HttpClient);

  readonly apiBaseUrl = API_BASE_URL + '/ngrx';

  fetchTopics(): Observable<NgrxTopic[]> {
    return this.http.get<NgrxTopic[]>(`${this.apiBaseUrl}/topics`);
  }

  fetchQuizzes(): Observable<NgrxQuiz[]> {
    return this.http.get<NgrxQuiz[]>(`${this.apiBaseUrl}/quizzes`);
  }
}
