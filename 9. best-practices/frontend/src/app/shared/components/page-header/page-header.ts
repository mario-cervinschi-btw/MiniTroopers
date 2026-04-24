import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  readonly eyebrowText = input.required();
  readonly headerTitle = input.required();
  readonly description = input.required();
  readonly eyebrowColor = input<string>('#6366f1');
  readonly eyebrowBg = input<string>('#eef2ff');
  readonly customGradient = input<string>('linear-gradient(135deg, #1e1b4b 0%, #6366f1 100%)');
}
