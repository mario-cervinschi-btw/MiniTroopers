import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrl: './data-container.component.scss',
  standalone: false,
})
export class DataContainerComponent {
  @Input() title!: string;
  @Input() cell1Title!: string;
  @Input() cell1Data!: string;

  @Input() cell2Title!: string;
  @Input() cell2Data!: string;

  @Input() cell3Title!: string;
  @Input() cell3Data!: string;

  @Input() cell4Title!: string;
  @Input() cell4Data!: string;
}
