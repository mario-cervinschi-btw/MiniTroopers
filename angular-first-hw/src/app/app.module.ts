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
import { TableComponent } from './pages/table-page/table.component';
import { TableHeaderComponent } from './feature/table/components/table-header/table-header.component';
import { TableRowComponent } from './feature/table/components/table-row/table-row.component';
import { SurvivedPipe } from './logic/survived-pipe';
import { FullNameGeneratePipe } from './logic/name-pipe';
import { CityCompletionPipe } from './logic/city-pipe';
import { PassengerService } from './services/passenger.service';
import { AppRoutingModule } from './app-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DataContainerComponent } from './feature/passengers/components/data-container/data-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    TableHeaderComponent,
    TableRowComponent,
    UserPageComponent,
    DataContainerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SurvivedPipe,
    FullNameGeneratePipe,
    CityCompletionPipe,
    AppRoutingModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    PassengerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
