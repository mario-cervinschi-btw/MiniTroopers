import { Injectable, OnInit } from '@angular/core';
import { PassengerData } from '../shared/models/titanic-data.model';
import { TITANIC_PASSENGERS } from '../shared/titanic-data';
import { BehaviorSubject, delay, Observable, of, Subject } from 'rxjs';
import {
  defaultPassengerProfile,
  PassengerDataProfile,
} from '../shared/models/passenger-data-profile';
import { SurvivedPipe } from '../logic/survived-pipe';
import { CityCompletionPipe } from '../logic/city-pipe';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private sortStrategy: '' | 'ASC' | 'DESC' = '';

  public readonly passengerSubject$ = new BehaviorSubject<PassengerData[]>(TITANIC_PASSENGERS);

  constructor(
    private alivePipe: SurvivedPipe,
    private cityPipe: CityCompletionPipe,
    private currencyPipe: CurrencyPipe,
  ) {}

  public getPassengerById(id: number): Observable<PassengerDataProfile> {
    const passenger: PassengerData | undefined = TITANIC_PASSENGERS.find(
      (p) => p.passengerId === id,
    );

    const passengerProfileData: PassengerDataProfile = !passenger
      ? defaultPassengerProfile
      : {
          name: passenger.name,
          sections: [
            {
              title: 'Personal Information',
              cells: [
                {
                  title: 'Survived',
                  data: this.alivePipe.transform(passenger.survived),
                },
                {
                  title: 'Sex',
                  data: passenger.sex,
                },
                {
                  title: 'Age',
                  data: passenger.age + '',
                },
                {
                  title: 'Class',
                  data: passenger.pclass + '',
                },
              ],
            },
            {
              title: 'Family Information',
              cells: [
                {
                  title: 'Siblings/spouses aboard',
                  data: passenger.sibsp + '',
                },
                {
                  title: 'Parents/children aboard',
                  data: passenger.parch + '',
                },
                {
                  title: 'Total family members',
                  data: passenger.sibsp + passenger.parch + '',
                },
              ],
            },
            {
              title: 'Ticket Information',
              cells: [
                {
                  title: 'Ticket number',
                  data: passenger.ticket,
                },
                {
                  title: 'Fare',
                  data: this.currencyPipe.transform(passenger.fare, 'GBP') + '',
                },
                {
                  title: 'Cabin',
                  data:
                    passenger.cabin === '' ? 'Not Available' : (passenger.cabin ?? 'Not Available'),
                },
                {
                  title: 'Embarked',
                  data: this.cityPipe.transform(passenger.embarked),
                },
              ],
            },
          ],
        };

    return of(passengerProfileData);
  }

  public getPassengers(): void {
    if (this.sortStrategy === 'DESC') {
      this.sortStrategy = '';
      this.passengerSubject$.next(TITANIC_PASSENGERS);
      return;
    }

    if (this.sortStrategy === '') {
      const sortedAsc = [...TITANIC_PASSENGERS].sort((a, b) => {
        if (a.name.split(',')[0] < b.name.split(',')[0]) {
          return -1;
        }
        if (a.name.split(',')[0] > b.name.split(',')[0]) {
          return 1;
        }
        return 0;
      });
      this.sortStrategy = 'ASC';
      this.passengerSubject$.next(sortedAsc);
      return;
    }

    if (this.sortStrategy === 'ASC') {
      const sortedDesc = [...TITANIC_PASSENGERS].sort((a, b) => {
        if (a.name.split(',')[0] < b.name.split(',')[0]) {
          return 1;
        }
        if (a.name.split(',')[0] > b.name.split(',')[0]) {
          return -1;
        }
        return 0;
      });
      this.sortStrategy = 'DESC';
      this.passengerSubject$.next(sortedDesc);
      return;
    }
  }

  public getCurrentSortStrategy(): '' | 'ASC' | 'DESC' {
    return this.sortStrategy;
  }
}
