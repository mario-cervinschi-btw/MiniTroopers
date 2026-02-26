import { Component, inject } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import {
  CardConfig,
  CardItem,
  ProfileCardsComponent,
} from '../../shared/components/profile-cards/profile-cards.component';

@Component({
  selector: 'app-user-profile',
  imports: [MatProgressSpinnerModule, WrapperComponent, ProfileCardsComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  private readonly userService: UsersService = inject(UsersService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected currentUser!: User;
  protected isLoadingUser: boolean = false;

  ngOnInit() {
    const currentUserId = this.route.snapshot.params['id'];
    this.isLoadingUser = true;
    this.userService
      .getUserById(currentUserId)
      .pipe(finalize(() => (this.isLoadingUser = false)))
      .subscribe((next) => {
        console.log(next);
        this.currentUser = next;
      });
  }

  protected buildExperienceData(): [CardItem[], CardConfig[]] {
    const cardData: CardItem[] = [];

    this.currentUser.experience.forEach((e) => {
      const experienceField: CardItem = {
        title: e.title,
        workPlace: e.company + ' * ' + e.location,
        duration: e.startDate + ' - ' + e.endDate,
        description: e.description,
      };

      cardData.push(experienceField);
    });

    const dataConfig: CardConfig[] = [
      { key: 'title', isTitle: true },
      { key: 'workPlace', isSubtitle: true },
      { key: 'duration', isSubtitle: true },
    ];

    return [cardData, dataConfig];
  }

  protected buildAboutData(): [CardItem[], CardConfig[]] {
    const cardData: CardItem[] = [
      {
        about: this.currentUser.about,
        dob: this.currentUser.dateOfBirth,
      },
    ];

    const dataConfig: CardConfig[] = [{ key: 'dob', isSubtitle: true, icon: 'cake' }];

    return [cardData, dataConfig];
  }

  protected buildEducationData(): [CardItem[], CardConfig[]] {
    const cardData: CardItem[] = [];

    this.currentUser.education.forEach((e) => {
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

    return [cardData, dataConfig];
  }

  protected buildSkillsData(): [CardItem[], CardConfig[]] {
    const cardData: CardItem[] = [
      {
        skills: this.currentUser.skills,
      },
    ];

    const dataConfig: CardConfig[] = [{ key: 'skills', isShowcase: true }];

    return [cardData, dataConfig];
  }

  protected buildSummaryData(): [CardItem[], CardConfig[]] {
    const cardData: CardItem[] = [];

    const cardItem1: CardItem = {};

    cardData.push(cardItem1);

    const cardItem2: CardItem = {
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      website: this.currentUser.website,
    };

    cardData.push(cardItem2);

    const dataConfig: CardConfig[] = [
      { key: 'email', isLink: true, icon: 'mail' },
      { key: 'website', isLink: true, icon: 'link' },
    ];

    return [cardData, dataConfig];
  }
}
