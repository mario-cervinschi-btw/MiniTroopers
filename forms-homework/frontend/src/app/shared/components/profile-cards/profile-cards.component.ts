import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AvatarComponent } from '../avatar/avatar.component';
import { UserProfileComponent } from '../../../pages/user-profile/user-profile.component';
import { UserProfileCardComponent } from '../user-profile-card/user-profile-card.component';

export interface CardConfig {
  key: string;
  isShowcase?: boolean;
  isTitle?: boolean;
  isSubtitle?: boolean;
  isLink?: boolean;
  isSummary?: boolean;
  icon?: string;
}

export interface CardItem {
  [key: string]: any;
}

@Component({
  selector: 'app-profile-cards',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatChipsModule],
  templateUrl: './profile-cards.component.html',
  styleUrl: './profile-cards.component.scss',
})
export class ProfileCardsComponent {
  @Input()
  public cardTitle!: string;
  @Input()
  public data: CardItem[] = [];
  @Input()
  public config: CardConfig[] = [];

  getEntries(data: any) {
    return Object.entries(data);
  }

  protected isTitle(field: any): boolean {
    return this.config.find((p) => p.key === field)?.isTitle ?? false;
  }

  protected isSubtitle(field: any): boolean {
    return this.config.find((p) => p.key === field)?.isSubtitle ?? false;
  }

  protected isShowcase(field: any): boolean {
    return this.config.find((p) => p.key === field)?.isShowcase ?? false;
  }

  protected isSummary(field: any): boolean {
    return this.config.find((p) => p.key === field)?.isSummary ?? false;
  }

  protected isLink(field: any): boolean {
    return this.config.find((p) => p.key === field)?.isLink ?? false;
  }

  protected getIcon(field: any): string | undefined {
    return this.config.find((p) => p.key === field)?.icon;
  }

  protected getShowcaseArray(value: any): string[] {
    return Array.isArray(value) ? value : [];
  }
}
