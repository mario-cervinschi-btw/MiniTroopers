import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { TableComponent } from './pages/table-page/table.component';
import { TableHeaderComponent } from './pages/table-page/components/table-header/table-header.component';
import { TableRowComponent } from './pages/table-page/components/table-row/table-row.component';
import { SurvivedPipe } from './pipes/survived-pipe';
import { FullNameGeneratePipe } from './pipes/name-pipe';
import { CityCompletionPipe } from './pipes/city-pipe';
import { PassengerService } from './services/passenger.service';
import { AppRoutingModule } from './app-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DataContainerComponent } from './pages/user-page/components/data-container/data-container.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { StatisticsOverviewComponent } from './pages/statistics-overview/statistics-overview.component';
import { CustomStatisticComponent } from './shared/components/custom-statistic/custom-statistic.component';
import { StatisticsService } from './services/statistics.service';
import { TitleHeadingComponent } from './shared/components/title-heading/title-heading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    TableHeaderComponent,
    TableRowComponent,
    UserPageComponent,
    DataContainerComponent,
    PaginationComponent,
    StatisticsOverviewComponent,
    CustomStatisticComponent,
    TitleHeadingComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SurvivedPipe,
    FullNameGeneratePipe,
    CityCompletionPipe,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    PassengerService,
    StatisticsService,
    SurvivedPipe,
    FullNameGeneratePipe,
    CityCompletionPipe,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
