import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../environments/environments';
import { PracticeCategoryDetails, PracticeCategorySummary } from '../models/practice.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PracticesService {
  private readonly http = inject(HttpClient);

  private readonly apiBaseUrl = API_BASE_URL + '/practices';

  fetchCategories(): Observable<PracticeCategorySummary[]> {
    return this.http.get<PracticeCategorySummary[]>(`${this.apiBaseUrl}/categories`);
  }

  fetchCategoryDetails(slug: string): Observable<PracticeCategoryDetails> {
    return this.http.get<PracticeCategoryDetails>(`${this.apiBaseUrl}/categories/${slug}`);
  }
}
