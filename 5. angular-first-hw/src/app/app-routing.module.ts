import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './pages/table-page/table.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { StatisticsOverviewComponent } from './pages/statistics-overview/statistics-overview.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'passenger/:id', component: UserPageComponent },
  { path: 'statistics', component: StatisticsOverviewComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
