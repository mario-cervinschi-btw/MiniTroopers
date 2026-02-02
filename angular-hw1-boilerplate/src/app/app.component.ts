import { Component } from '@angular/core';

/**
 * AppComponent
 * 
 * Root component of the application.
 * 
 * Teaching point: Root component is declared in AppModule and receives
 * feature components through module imports rather than standalone imports.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent {
  protected readonly title = 'titanic-table';
}
