import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PracticesService {
  private readonly http = inject(HttpClient);

  readonly apiBaseUrl = API_BASE_URL + '/practices';

  fetchCategories() {
    return this.http.get<any[]>(`${this.apiBaseUrl}/categories`);
  }

  fetchCategoryDetails(slug: string) {
    return this.http.get<any>(`${this.apiBaseUrl}/categories/${slug}`);
  }
}
