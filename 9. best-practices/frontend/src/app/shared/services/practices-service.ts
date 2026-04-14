import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PracticesService {
  private readonly http = inject(HttpClient);

  readonly apiBaseUrl = 'http://localhost:3000/practices';

  fetchCategories() {
    return this.http.get<any[]>(`${this.apiBaseUrl}/categories`);
  }

  fetchCategoryDetails(slug: string) {
    return this.http.get<any>(`${this.apiBaseUrl}/categories/${slug}`);
  }
}
