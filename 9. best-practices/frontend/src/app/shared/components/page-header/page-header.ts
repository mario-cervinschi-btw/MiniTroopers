import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  eyebrowText = input.required();
  headerTitle = input.required();
  description = input.required();
  eyebrowColor = input<string>('#6366f1');
  eyebrowBg = input<string>('#eef2ff');
  customGradient = input<string>('linear-gradient(135deg, #1e1b4b 0%, #6366f1 100%)');
}
