import { Component, inject, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  themeQuartz,
  type CellValueChangedEvent,
  type ColDef,
  type GridReadyEvent,
  type RowSelectionOptions,
  type SelectionChangedEvent,
} from 'ag-grid-community';
import { delay, finalize, take } from 'rxjs';
import { data$ } from './table.data';
import { DatePipe } from '@angular/common';
import { OrgHierarcy } from '../org-hierarcy/org-hierarcy';
import { GenericCard } from '../generic-card/generic-card';

interface IRow {
  firstName: string;
  lastName: string;
  role: string;
  birthDate: string;
  gender: string;
  workEmail: string;
  hireDate: string;
  location: string;
  directManager: string;
}

@Component({
  selector: 'app-table-component',
  imports: [AgGridAngular, OrgHierarcy, GenericCard],
  providers: [DatePipe],
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
})
export class TableComponent {
  private readonly datepipe = inject(DatePipe);

  isLoading = signal<boolean>(false);
  rowSelection: RowSelectionOptions = {
    mode: 'multiRow',
    headerCheckbox: false,
  };
  theme = themeQuartz;

  rowData = signal<IRow[]>([]);

  defaultColDef: ColDef = {
    sortable: false,
    filter: true,
  };

  colDefs = signal<ColDef[]>([
    { field: 'firstName', editable: true },
    { field: 'lastName', editable: true },
    { field: 'role' },
    {
      field: 'birthDate',
      valueFormatter: (params) => {
        return this.datepipe.transform(params.value) ?? 'Invalid Date';
      },
    },
    {
      field: 'gender',
      valueFormatter: (params) => {
        const genderEmoji =
          params.value.toLowerCase() === 'male'
            ? '👨'
            : params.value.toLowerCase() === 'female'
              ? '👩'
              : 'Unknown gender';
        return genderEmoji + ' ' + params.value;
      },
    },
    { field: 'workEmail' },
    {
      field: 'hireDate',
      valueFormatter: (params) => {
        return this.datepipe.transform(params.value) ?? 'Invalid Date';
      },
    },
    { field: 'location' },
    { field: 'directManager' },
  ]);

  onGridReady(params: GridReadyEvent) {
    this.isLoading.set(true);
    data$
      .pipe(
        delay(2000),
        take(1),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (val) => {
          this.rowData.set(val);
        },
      });
  }

  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log(`New Cell Value: ${event.value}`);
  };

  onSelectionChanged = (event: SelectionChangedEvent) => {
    console.log(event.selectedNodes);
  };
}
