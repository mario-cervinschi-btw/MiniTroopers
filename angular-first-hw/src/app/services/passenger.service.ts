import { Injectable, OnInit } from '@angular/core';
import { PassengerData } from '../shared/models/titanic-data.model';
import { TITANIC_PASSENGERS } from '../shared/titanic-data';
import { BehaviorSubject, delay, Observable, of, Subject } from 'rxjs';
import {
  defaultPassengerProfile,
  PassengerDataProfile,
} from '../shared/models/passenger-data-profile';
import { SurvivedPipe } from '../pipes/survived-pipe';
import { CityCompletionPipe } from '../pipes/city-pipe';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private readonly MAX_DATA_PER_PAGE: number = 10;
  private sortStrategy: '' | 'ASC' | 'DESC' = '';
  private currentPassengers: PassengerData[] = TITANIC_PASSENGERS;

  public maxPages: number = Math.floor(TITANIC_PASSENGERS.length / this.MAX_DATA_PER_PAGE) + 1;

  public readonly passengerSubject$ = new BehaviorSubject<PassengerData[]>([]);
  public readonly currentPage$ = new BehaviorSubject<number>(0);

  constructor(
    private alivePipe: SurvivedPipe,
    private cityPipe: CityCompletionPipe,
    private currencyPipe: CurrencyPipe,
  ) {}

  public setPassengersByPage(strategy?: 'DEC' | 'FIRST' | 'LAST'): void {
    switch (strategy) {
      case 'DEC':
        this.currentPage$.next(this.currentPage$.value - 1);
        break;
      case 'FIRST':
        this.currentPage$.next(0);
        break;
      case 'LAST':
        this.currentPage$.next(this.maxPages - 1);
        break;
      default:
        this.currentPage$.next(this.currentPage$.value + 1);
        break;
    }

    this.passengerSubject$.next(
      this.currentPassengers.slice(
        this.currentPage$.value * this.MAX_DATA_PER_PAGE,
        (this.currentPage$.value + 1) * this.MAX_DATA_PER_PAGE,
      ),
    );
  }

  public sortPassengers(): void {
    if (this.sortStrategy === 'DESC') {
      this.sortStrategy = '';
      this.currentPassengers = TITANIC_PASSENGERS;
    } else if (this.sortStrategy === '') {
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
      this.currentPassengers = sortedAsc;
    } else if (this.sortStrategy === 'ASC') {
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
      this.currentPassengers = sortedDesc;
    }

    this.setPassengersByPage('FIRST');
  }

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

  public getCurrentSortStrategy(): '' | 'ASC' | 'DESC' {
    return this.sortStrategy;
  }
}
