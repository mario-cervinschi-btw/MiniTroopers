import { Component, Input } from '@angular/core';
import { PassengerDataProfileSectionCell } from '../../../../shared/models/passenger-data-profile';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrl: './data-container.component.scss',
  standalone: false,
})
export class DataContainerComponent {
  @Input() title!: string;
  @Input() cells!: PassengerDataProfileSectionCell[];
}
