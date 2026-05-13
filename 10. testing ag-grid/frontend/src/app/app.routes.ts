import { Routes } from '@angular/router';
import { TableComponent } from './table-component/table-component';
import { OrgHierarcy } from './org-hierarcy/org-hierarcy';

export const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },
  {
    path: 'oh',
    component: OrgHierarcy,
  },
];
