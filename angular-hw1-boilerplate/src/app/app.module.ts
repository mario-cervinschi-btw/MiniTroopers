import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './feature/passengers/components/header/header.component';
import { TableComponent } from './feature/table/table.component';
import { TableHeaderComponent } from './feature/table/components/table-header/table-header.component';
import { TableRowComponent } from './feature/table/components/table-row/table-row.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    TableHeaderComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {}
