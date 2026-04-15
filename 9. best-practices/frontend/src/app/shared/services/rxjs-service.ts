import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RxjsService {
  private readonly http = inject(HttpClient);

  readonly apiBaseUrl = API_BASE_URL + '/rxjs';

  fetchTopics() {
    return this.http.get<any[]>(`${this.apiBaseUrl}/topics`);
  }

  fetchQuizzes() {
    return this.http.get<any>(`${this.apiBaseUrl}/categories/quizzes`);
  }
}
