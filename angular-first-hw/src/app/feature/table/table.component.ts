import { Component, OnInit } from '@angular/core';
import { PassengerData } from '../../shared/models/titanic-data.model';
import { PassengerService } from '../../services/passenger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: false,
})
export class TableComponent implements OnInit {
  protected passengers: PassengerData[] = [];

  constructor(private passengerService: PassengerService) {}

  public ngOnInit(): void {
    this.initPassengerData();
    this.passengerService.setPassengerData();
  }

  private initPassengerData(): void {
    this.passengerService.getSubjectSubscription().subscribe({
      next: (passengers) => {
        this.passengers = passengers;
      },
    });
  }
}
