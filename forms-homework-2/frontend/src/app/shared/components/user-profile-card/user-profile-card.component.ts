import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatAnchor } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-card',
  imports: [MatCardModule, MatDividerModule, MatIconModule, AvatarComponent, MatAnchor],
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.scss',
})
export class UserProfileCardComponent {
  @Input()
  public firstName!: string;

  @Input()
  public lastName!: string;

  @Input()
  public headline!: string;

  @Input()
  public location!: string;

  @Input()
  public connections!: number;

  @Input()
  public email?: string;

  @Input()
  public phone?: string;

  @Input()
  public website?: string;

  private router = inject(Router);

  protected onSettingsClick() {
    this.router.navigate(['/settings']);
  }
}
