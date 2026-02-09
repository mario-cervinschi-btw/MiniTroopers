import { Component, OnInit } from '@angular/core';
import { PassengerData } from '../../shared/models/titanic-data.model';
import { PassengerService } from '../../services/passenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: false,
})
export class TableComponent implements OnInit {
  protected passengers: PassengerData[] = [];

  constructor(
    private passengerService: PassengerService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.initPassengerData();
    this.passengerService.setPassengerData();
  }

  public goToUserPage(id: number): void {
    console.log('clicked');
    this.router.navigate(['/passenger', id]);
  }

  private initPassengerData(): void {
    this.passengerService.getSubjectSubscription().subscribe({
      next: (passengers) => {
        this.passengers = passengers;
      },
    });
  }
}
