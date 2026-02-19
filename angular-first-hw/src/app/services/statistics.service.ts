import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, of, Subject } from 'rxjs';
import { StatisticCategory, StatisticData, Statistics } from '../shared/models/statistics-model';
import { TITANIC_PASSENGERS } from '../shared/titanic-data';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  public getStatistics(): Observable<Statistics> {
    return of(this.buildStatistics());
  }

  private buildStatistics(): Statistics {
    const totalPassengers = TITANIC_PASSENGERS.length;
    const survivors = TITANIC_PASSENGERS.filter((p) => p.survived === 1).length;
    const deaths = TITANIC_PASSENGERS.filter((p) => p.survived === 0).length;
    const survivalRate = Math.ceil((survivors * 100) / totalPassengers);

    const males = TITANIC_PASSENGERS.filter((p) => p.sex === 'male').length;
    const females = TITANIC_PASSENGERS.filter((p) => p.sex !== 'male').length;
    const maleSurvivors = TITANIC_PASSENGERS.filter(
      (p) => p.sex === 'male' && p.survived === 1,
    ).length;
    const femaleSurvivors = TITANIC_PASSENGERS.filter(
      (p) => p.sex !== 'male' && p.survived === 1,
    ).length;
    const maleSurvivorRate = Math.ceil((maleSurvivors * 100) / males);
    const femaleSurvivorRate = Math.ceil((femaleSurvivors * 100) / females);

    const firstClass = TITANIC_PASSENGERS.filter((p) => p.pclass === 1).length;
    const secondClass = TITANIC_PASSENGERS.filter((p) => p.pclass === 2).length;
    const thirdClass = TITANIC_PASSENGERS.filter((p) => p.pclass === 3).length;
    const firstClassSurvivors = TITANIC_PASSENGERS.filter(
      (p) => p.pclass === 1 && p.survived === 1,
    ).length;
    const secondClassSurvivors = TITANIC_PASSENGERS.filter(
      (p) => p.pclass === 2 && p.survived === 1,
    ).length;
    const thirdClassSurvivors = TITANIC_PASSENGERS.filter(
      (p) => p.pclass === 3 && p.survived === 1,
    ).length;

    const dataCategory1: StatisticData[] = [
      {
        title: 'Total passengers',
        data: totalPassengers + '',
      },
      {
        title: 'Total survivors',
        data: survivors + '',
      },
      {
        title: 'Total deaths',
        data: deaths + '',
      },
      {
        title: 'Survival Rate',
        data: survivalRate + '%',
      },
    ];
    const dataCategory2: StatisticData[] = [
      {
        title: 'Male passengers',
        data: males + '',
      },
      {
        title: 'Female passengers',
        data: females + '',
      },
      {
        title: 'Male survivors',
        data: maleSurvivors + '',
      },
      {
        title: 'Female Survivors',
        data: femaleSurvivors + '',
      },
      {
        title: 'Male survival rate',
        data: maleSurvivorRate + '%',
      },
      {
        title: 'Female Survivors',
        data: femaleSurvivorRate + '%',
      },
    ];
    const dataCategory3: StatisticData[] = [
      {
        title: '1st class passengers',
        data: firstClass + '',
      },
      {
        title: '2nd class passengers',
        data: secondClass + '',
      },
      {
        title: '3rd class passengers',
        data: thirdClass + '',
      },
      {
        title: '1st class survivors',
        data: firstClassSurvivors + '',
      },
      {
        title: '2nd class survivors',
        data: secondClassSurvivors + '',
      },
      {
        title: '3rd class survivors',
        data: thirdClassSurvivors + '',
      },
    ];

    const category1: StatisticCategory = {
      title: 'General Overview',
      data: dataCategory1,
    };

    const category2: StatisticCategory = {
      title: 'Gender Statistics',
      data: dataCategory2,
    };
    const category3: StatisticCategory = {
      title: 'Class Statistics',
      data: dataCategory3,
    };

    const statistics: Statistics = {
      data: [category1, category2, category3],
    };

    return statistics;
  }
}
