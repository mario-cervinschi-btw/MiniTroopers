import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic.model';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class NgrxService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = API_BASE_URL + '/ngrx';

  fetchTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiBaseUrl}/topics`);
  }

  fetchQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiBaseUrl}/quizzes`);
  }
}
