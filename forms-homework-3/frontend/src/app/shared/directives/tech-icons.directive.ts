import { Directive, inject, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[tech-icons]',
  standalone: true,
  host: {
    '[style.color]': 'color',
  },
})
export class TechIconsDirective implements OnInit {
  @Input({ required: true }) headline: string = '';
  protected color: string = '';

  private readonly matIcon = inject(MatIcon, { self: true });

  private readonly techIcons = [
    { keyword: 'angular', name: 'angular-custom', color: 'red' },
    { keyword: 'javascript', name: 'js-custom', color: 'green' },
    { keyword: 'typescript', name: 'ts-custom', color: 'blue' },
    { keyword: 'nestjs', name: 'nestjs-custom', color: 'magenta' },
    { keyword: 'node.js', name: 'nodejs-custom', color: 'purple' },
    { keyword: 'rxjs', name: 'rxjs-custom', color: 'pink' },
    { keyword: 'html', name: 'html-custom', color: 'gray' },
    { keyword: 'css', name: 'css-custom', color: 'yellow' },
    { keyword: 'sql', name: 'sql-custom', color: 'cyan' },
    { keyword: 'git', name: 'git-custom', color: 'brown' },
  ];

  ngOnInit(): void {
    this.techIcons.forEach((ti) => {
      if (this.headline.toLowerCase().includes(ti.keyword)) {
        this.matIcon.svgIcon = ti.name;
        this.color = ti.color;
      }
    });
  }
}
