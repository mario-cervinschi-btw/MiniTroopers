import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './feature/passengers/components/header/header.component';
import { TableComponent } from './feature/table/table.component';
import { TableHeaderComponent } from './feature/table/components/table-header/table-header.component';
import { TableRowComponent } from './feature/table/components/table-row/table-row.component';
import { SurvivedPipe } from './logic/survived-pipe';
import { FullNameGeneratePipe } from './logic/name-pipe';
import { CityCompletionPipe } from './logic/city-pipe';
import { PassengerService } from './services/passenger.service';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    TableHeaderComponent,
    TableRowComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    SurvivedPipe,
    FullNameGeneratePipe,
    CityCompletionPipe,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    PassengerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
