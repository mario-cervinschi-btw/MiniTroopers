import { Component, Input } from '@angular/core';
import { PassengerData } from '../../../../shared/models/titanic-data.model';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
  standalone: false,
})
export class TableRowComponent {
  @Input()
  public passenger!: PassengerData;

  keys(): Array<any> {
    return Object.entries(this.passenger);
  }
}
