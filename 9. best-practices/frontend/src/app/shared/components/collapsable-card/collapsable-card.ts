import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-collapsable-card',
  imports: [],
  templateUrl: './collapsable-card.html',
  styleUrls: ['./collapsable-card.scss', '../../styles/code-area.scss'],
})
export class CollapsableCard {
  title = input.required<string>();
  tag = input.required<string>();
  description = input.required<string>();
  keyPoints = input.required<string[]>();
  example = input.required<string>();

  isExpanded = input.required<boolean>();

  // optional styling inputs
  customCodeAreaBg = input<string>();
  customCodeAreaTextColor = input<string>();
  customTopicBg = input<string>();
}
