import { Component, Input, OnInit } from '@angular/core';
import { PassengerData } from '../../shared/models/titanic-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerService } from '../../services/passenger.service';
import { delay, Observable } from 'rxjs';
import { PassengerDataProfile } from '../../shared/models/passenger-data-profile';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  standalone: false,
})
export class UserPageComponent implements OnInit {
  protected passenger$!: Observable<PassengerDataProfile>;
  protected passengerId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passengerService: PassengerService,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.passengerId = +params['id'];
      this.passenger$ = this.passengerService.getPassengerById(this.passengerId).pipe(delay(2500));
    });
  }

  protected goBackToTable(): void {
    this.router.navigate(['/']);
  }
}
