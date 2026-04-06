import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-statistic',
  templateUrl: './custom-statistic.component.html',
  styleUrl: './custom-statistic.component.scss',
  standalone: false,
})
export class CustomStatisticComponent {
  @Input()
  public statisticCardTitle: string = 'N/A';

  @Input()
  public statisticCardData: string = 'N/A';
}
