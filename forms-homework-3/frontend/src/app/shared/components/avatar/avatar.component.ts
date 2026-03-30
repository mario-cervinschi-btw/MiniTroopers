import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() public firstName: string = '';
  @Input() public lastName: string = '';
  @Input() public size: 'small' | 'large' | 'medium' | 'xl' = 'medium';

  get initials(): string {
    const firstInitial = this.firstName.charAt(0).toUpperCase();
    const lastInitial = this.lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  get plainSize(): number {
    return this.size === 'small' ? 24 : this.size === 'large' ? 56 : this.size === 'xl' ? 100 : 40;
  }

  get backgroundColor(): string {
    return '#0a66c2';
  }
}
