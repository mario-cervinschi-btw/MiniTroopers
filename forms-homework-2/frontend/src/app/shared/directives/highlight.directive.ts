import { Directive, ElementRef, HostBinding, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  private readonly element = inject(ElementRef);

  @Input({ required: true }) highlight: string = '';

  @HostBinding('style.background') backgroundColor: string = '';

  @HostListener('mouseenter') onEnter() {
    this.setBackgroundColor('magenta');
  }

  @HostListener('mouseleave') onLeave() {
    this.setBackgroundColor('');
  }

  private setBackgroundColor(color: string) {
    if (this.highlight.toLowerCase().includes('angular')) {
      // without hostbinding
      // this.element.nativeElement.style.backgroundColor = color;

      // with hostbinding
      this.backgroundColor = color;
    }
  }
}
