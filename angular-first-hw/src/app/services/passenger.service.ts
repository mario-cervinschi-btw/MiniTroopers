import { Injectable, OnInit } from '@angular/core';
import { PassengerData } from '../shared/models/titanic-data.model';
import { TITANIC_PASSENGERS } from '../shared/titanic-data';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private sortStrategy: '' | 'ASC' | 'DESC' = '';

  public readonly subject = new Subject<PassengerData[]>();

  public getSubjectSubscription(): Observable<PassengerData[]> {
    return this.subject;
  }

  public setPassengerData(): void {
    if (this.sortStrategy === 'DESC') {
      this.subject.next(TITANIC_PASSENGERS);
      this.sortStrategy = '';
      return;
    }

    if (this.sortStrategy === '') {
      this.subject.next(
        [...TITANIC_PASSENGERS].sort((a, b) => {
          if (a.name.split(',')[0] < b.name.split(',')[0]) {
            return -1;
          }
          if (a.name.split(',')[0] > b.name.split(',')[0]) {
            return 1;
          }
          return 0;
        }),
      );
      this.sortStrategy = 'ASC';
      return;
    }

    if (this.sortStrategy === 'ASC') {
      this.subject.next(
        [...TITANIC_PASSENGERS].sort((a, b) => {
          if (a.name.split(',')[0] < b.name.split(',')[0]) {
            return 1;
          }
          if (a.name.split(',')[0] > b.name.split(',')[0]) {
            return -1;
          }
          return 0;
        }),
      );
      this.sortStrategy = 'DESC';
      return;
    }
  }

  public getCurrentSortStrategy(): '' | 'ASC' | 'DESC' {
    return this.sortStrategy;
  }
}
