import { Component, OnInit } from '@angular/core';
import { TITANIC_PASSENGERS } from '../../shared/titanic-data';
import { PassengerData } from '../../shared/models/titanic-data.model';

@Component({
  selector: 'app-main-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: false,
})
export class TableComponent {
  protected readonly passengers: PassengerData[] = TITANIC_PASSENGERS;
}
