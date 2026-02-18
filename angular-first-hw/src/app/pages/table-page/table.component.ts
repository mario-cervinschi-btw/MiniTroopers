import { Component, OnInit } from '@angular/core';
import { PassengerData } from '../../shared/models/titanic-data.model';
import { PassengerService } from '../../services/passenger.service';
import { Router } from '@angular/router';
import { debounceTime, delay, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-main-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: false,
})
export class TableComponent implements OnInit {
  protected passengers$!: Observable<PassengerData[]>;
  protected isLoading: boolean = true;

  constructor(
    private passengerService: PassengerService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.passengers$ = this.passengerService.passengerSubject$.pipe(
      tap(() => (this.isLoading = true)),
      debounceTime(2500),
      tap(() => (this.isLoading = false)),
    );
    this.passengerService.setPassengersByPage('FIRST');
  }

  public goToUserPage(id: number): void {
    this.router.navigate(['/passenger', id]);
  }
}
