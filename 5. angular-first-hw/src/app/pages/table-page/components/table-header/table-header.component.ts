import { Component } from '@angular/core';
import { TableHeaderColumn } from '../../../../shared/models/table-header.model';
import { TABLE_HEADER_COLUMN_DATA } from '../../../../shared/table-header-data';
import { PassengerService } from '../../../../services/passenger.service';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.scss',
  standalone: false,
})
export class TableHeaderComponent {
  protected readonly columns: TableHeaderColumn[] = TABLE_HEADER_COLUMN_DATA;
  protected nameSortStrategyHeader: String = '';

  public constructor(private passengerService: PassengerService) {
    this.nameSortStrategyHeader = this.passengerService.getCurrentSortStrategy();
  }

  protected onClickNameHeader(): void {
    this.passengerService.sortPassengers();
    this.nameSortStrategyHeader = this.passengerService.getCurrentSortStrategy();
  }
}
