import { Directive, ElementRef, HostBinding, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  private element = inject(ElementRef);

  @Input({ required: true }) highlight: string = '';

  @HostListener('mouseenter') onEnter() {
    this.setBackgroundColor('magenta');
  }

  @HostListener('mouseleave') onLeave() {
    this.setBackgroundColor('');
  }

  @HostBinding('style.background') backgroundColor: string;

  private setBackgroundColor(color: string) {
    if (this.highlight.toLowerCase().includes('angular')) {
      this.element.nativeElement.style.backgroundColor = color;
    }
  }
}
