import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, RouterOutlet, WrapperComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
