import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  from,
  map,
  mergeMap,
  of,
  shareReplay,
  tap,
  toArray,
} from 'rxjs';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { RxjsService } from '../../shared/services/rxjs-service';
import { RxjsQuiz, RxjsTopic } from '../../shared/models/rxjs.model';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  imports: [CommonModule, ReactiveFormsModule, PageHeader],
})
export class RxjsComponent {
  private rxjsService = inject(RxjsService);

  topics: RxjsTopic[] = [];
  loading = false;
  searchControl = new FormControl('');

  activeTab: 'topics' | 'quiz' | 'analogies' = 'topics';

  ngOnInit(): void {
    this.loading = true;
    this.rxjsService.fetchTopics().subscribe((topics) => {
      this.topics = topics;
      this.filteredTopics = topics;
      this.loading = false;
    });

    this.rxjsService.fetchQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(0),
        distinctUntilChanged(),
        map((term) => term ?? ''),
        filter(() => true),
        tap((term) => console.log('searching for:', term)),
        concatMap((term) =>
          of(term).pipe(
            delay(0),
            map((t) => t.toLowerCase()),
            mergeMap((lowerTerm) =>
              from(this.topics).pipe(
                filter((t) => t.title.toLowerCase().includes(lowerTerm)),
                toArray(),
              ),
            ),
          ),
        ),
        shareReplay(1),
      )
      .subscribe((filtered) => {
        this.filteredTopics = filtered;
      });
  }

  filteredTopics: any[] = [];

  selectTab(tab: any): void {
    this.activeTab = tab;
  }

  quizzes: RxjsQuiz[] = [];
  expandedIndex: number | null = null;

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }

  selectedAnswers: any = {};

  selectAnswer(quizIndex: any, optionIndex: any): void {
    this.selectedAnswers[quizIndex] = optionIndex;
  }

  revealedQuizzes: any = {};

  revealExplanation(quizIndex: any): void {
    this.revealedQuizzes[quizIndex] = true;
  }

  isAnswered(quizIndex: any): boolean {
    return this.selectedAnswers[quizIndex] !== undefined;
  }

  isCorrect(quizIndex: any): boolean {
    return this.selectedAnswers[quizIndex] === this.quizzes[quizIndex].correctIndex;
  }
}
