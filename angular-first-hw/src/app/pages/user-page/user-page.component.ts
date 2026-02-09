import { Component, Input, OnInit } from '@angular/core';
import { PassengerData } from '../../shared/models/titanic-data.model';
import { ActivatedRoute } from '@angular/router';
import { PassengerService } from '../../services/passenger.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  standalone: false,
})
export class UserPageComponent implements OnInit {
  protected passenger!: PassengerData;

  constructor(
    private route: ActivatedRoute,
    private passengerService: PassengerService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const passengerId = +params['id'];
      this.passenger = this.passengerService.getPassengerById(passengerId)!;
    });
  }
}
