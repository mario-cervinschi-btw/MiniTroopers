import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-user-profile-card',
  imports: [MatCardModule, MatDividerModule, MatIconModule, AvatarComponent],
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.scss',
})
export class UserProfileCardComponent {}
