import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  imports: [],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
})
export class WrapperComponent {
  @Input()
  public title!: string;
}
