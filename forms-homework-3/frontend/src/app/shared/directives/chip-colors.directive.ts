import { Directive } from '@angular/core';

const RANDOM_COLORS = ['pink', 'yellow', 'red', 'blue', 'cyan', 'magenta', 'purple'];

@Directive({
  selector: '[appChipColors]',
  host: {
    '[style.backgroundColor]': 'bgColor',
    '[style.opacity]': 'bgOpacity',
  },
})
export class ChipColorsDirective {
  protected bgColor: string = '';
  protected bgOpacity: number = 1;

  constructor() {
    this.getRandomColor();
    this.getRandomOpacity();
  }

  private getRandomColor() {
    this.bgColor = RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
  }

  private getRandomOpacity() {
    this.bgOpacity = Math.random() * 0.5 + 0.5;
  }
}
