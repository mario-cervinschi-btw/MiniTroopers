import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-heading',
  templateUrl: './title-heading.component.html',
  styleUrl: './title-heading.component.scss',
  standalone: false,
})
export class TitleHeadingComponent {
  @Input()
  public title!: string;

  @Input()
  public titleSize: number = 16;
}
