import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-people-card',
  imports: [],
  templateUrl: './summary-people-card.html',
  styleUrl: './summary-people-card.scss',
})
export class SummaryPeopleCard {
  facilitator = input.required<string>();
  pnr = input.required<string>();
}
