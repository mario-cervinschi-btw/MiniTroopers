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
  @Input({ required: true })
  public firstName!: string;

  @Input({ required: true })
  public lastName!: string;

  @Input()
  public headline: string | null = null;

  @Input()
  public location: string | null = null;

  @Input()
  public connections: number | null = null;

  @Input()
  public email: string | null = null;

  @Input()
  public phone: string | null = null;

  @Input()
  public website: string | null = null;

  private readonly router = inject(Router);

  protected onSettingsClick() {
    this.router.navigate(['/settings']);
  }
}
