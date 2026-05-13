import { Component, input } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  imports: [],
  templateUrl: './generic-card.html',
  styleUrl: './generic-card.scss',
})
export class GenericCard {
  cardTitle = input.required<string>();
}
