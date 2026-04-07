import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import {
  CardConfig,
  CardItem,
  ProfileCardsComponent,
} from '../../shared/components/profile-cards/profile-cards.component';
import { UserProfileCardComponent } from '../../shared/components/user-profile-card/user-profile-card.component';
import { DatePipe } from '@angular/common';
import { IfCurrentUserDirective } from '../../shared/directives/if-current-user.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-profile',
  imports: [
    MatProgressSpinnerModule,
    WrapperComponent,
    ProfileCardsComponent,
    UserProfileCardComponent,
    IfCurrentUserDirective,
  ],
  providers: [DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private readonly userService: UsersService = inject(UsersService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly datePipe: DatePipe = inject(DatePipe);

  protected currentUser: User | null = null;

  protected isLoadingUser: boolean = false;

  protected aboutData: CardItem[] = [];
  protected aboutConfig: CardConfig[] = [];

  protected experienceData: CardItem[] = [];
  protected experienceConfig: CardConfig[] = [];

  protected educationData: CardItem[] = [];
  protected educationConfig: CardConfig[] = [];

  protected skillsData: CardItem[] = [];
  protected skillsConfig: CardConfig[] = [];

  ngOnInit() {
    const currentUserId = this.route.snapshot.params['id'];
    this.isLoadingUser = true;
    this.userService
      .getUserById(currentUserId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoadingUser = false)),
      )
      .subscribe((next) => {
        if (next) {
          this.currentUser = next;
          this.buildExperienceData();
          this.buildAboutData();
          this.buildEducationData();
          this.buildSkillsData();
        }
      });
  }

  private buildExperienceData(): void {
    const cardData: CardItem[] = [];

    this.currentUser?.experience
      .sort((a, b) => {
        return (a.endDate ?? 'PRESENT') < (b.endDate ?? 'PRESENT')
          ? 1
          : (a.endDate ?? 'PRESENT') > (b.endDate ?? 'PRESENT')
            ? -1
            : 0;
      })
      .forEach((e) => {
        const experienceField: CardItem = {
          title: e.title,
          workPlace: e.company.name + ' • ' + e.location,
          duration: e.startDate + ' - ' + (e.endDate ?? 'PRESENT'),
          description: e.description,
        };

        cardData.push(experienceField);
      });

    const dataConfig: CardConfig[] = [
      { key: 'title', isTitle: true },
      { key: 'workPlace', isSubtitle: true },
      { key: 'duration', isSubtitle: true },
    ];

    this.experienceData = cardData;
    this.experienceConfig = dataConfig;
  }

  private buildAboutData(): void {
    if (!this.currentUser?.about) {
      return;
    }

    const cardData: CardItem[] = [
      {
        about: this.currentUser?.about,
        dob: this.currentUser?.dateOfBirth
          ? this.datePipe.transform(this.currentUser.dateOfBirth, 'MMM d, y')
          : null,
      },
    ];

    const dataConfig: CardConfig[] = [{ key: 'dob', isSubtitle: true, icon: 'cake' }];

    this.aboutData = cardData;
    this.aboutConfig = dataConfig;
  }

  private buildEducationData(): void {
    const cardData: CardItem[] = [];

    this.currentUser?.education.forEach((e) => {
      const educationField: CardItem = {
        title: e.institution,
        study: e.degree + ', ' + e.fieldOfStudy,
        duration: e.startYear + ' - ' + e.endYear,
      };

      cardData.push(educationField);
    });

    const dataConfig: CardConfig[] = [
      { key: 'title', isTitle: true },
      { key: 'study', isSubtitle: true },
      { key: 'duration', isSubtitle: true },
    ];

    this.educationData = cardData;
    this.educationConfig = dataConfig;
  }

  private buildSkillsData(): void {
    const skillsArray: string[] = [];

    this.currentUser?.skills.forEach((s) => {
      skillsArray.push(s.name);
    });

    if (skillsArray.length <= 0) {
      return;
    }

    const cardData: CardItem[] = [
      {
        skills: skillsArray,
      },
    ];

    const dataConfig: CardConfig[] = [{ key: 'skills', isShowcase: true }];

    this.skillsData = cardData;
    this.skillsConfig = dataConfig;
  }
}
