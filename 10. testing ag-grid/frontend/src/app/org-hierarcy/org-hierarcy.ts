import { Component, input } from '@angular/core';

@Component({
  selector: 'app-org-hierarcy',
  imports: [],
  templateUrl: './org-hierarcy.html',
  styleUrl: './org-hierarcy.scss',
})
export class OrgHierarcy {
  departmentName = input.required<string>();
  clusterName = input.required<string>();
  unitName = input.required<string>();

  departmentHead = input.required<string>();
  clusterHead = input.required<string>();
  unitHead = input.required<string>();
}
