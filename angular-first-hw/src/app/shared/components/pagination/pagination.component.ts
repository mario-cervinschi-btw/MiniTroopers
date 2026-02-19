import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../../../services/passenger.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: false,
})
export class PaginationComponent implements OnInit {
  protected maxPages: number = 0;
  protected currentPage: number = 0;

  constructor(private userService: PassengerService) {}

  ngOnInit(): void {
    this.userService.currentPage$.pipe(debounceTime(2500)).subscribe((next) => {
      this.currentPage = next + 1;
    });
    this.maxPages = this.userService.maxPages;
  }

  protected onNext(): void {
    this.userService.setPassengersByPage();
  }

  protected onPrevious(): void {
    this.userService.setPassengersByPage('DEC');
  }

  protected onFirst(): void {
    this.userService.setPassengersByPage('FIRST');
  }

  protected onLast(): void {
    this.userService.setPassengersByPage('LAST');
  }
}
