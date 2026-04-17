import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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

  private readonly topics = signal<RxjsTopic[]>([]);
  protected readonly filteredTopics = signal<RxjsTopic[]>([]);
  protected readonly loading = signal(false);
  protected readonly searchControl = new FormControl('');

  protected readonly activeTab = signal<'topics' | 'quiz' | 'analogies'>('topics');

  protected readonly quizzes = signal<RxjsQuiz[]>([]);
  protected readonly expandedIndex = signal<number | null>(null);

  protected readonly selectedAnswers = signal<Record<number, number>>({});
  protected readonly revealedQuizzes = signal<Record<number, boolean>>({});

  ngOnInit(): void {
    this.loading.set(true);
    this.rxjsService.fetchTopics().subscribe((topics) => {
      this.topics.set(topics);
      this.filteredTopics.set(topics);
      this.loading.set(false);
    });

    this.rxjsService.fetchQuizzes().subscribe((quizzes) => {
      this.quizzes.set(quizzes);
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
              from(this.topics()).pipe(
                filter((t) => t.title.toLowerCase().includes(lowerTerm)),
                toArray(),
              ),
            ),
          ),
        ),
        shareReplay(1),
      )
      .subscribe((filtered) => {
        this.filteredTopics.set(filtered);
      });
  }

  selectTab(tab: any): void {
    this.activeTab.set(tab);
  }

  toggle(index: number): void {
    const val = this.expandedIndex() === index ? null : index;
    this.expandedIndex.set(val);
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  selectAnswer(quizIndex: any, optionIndex: any): void {
    this.selectedAnswers.update((prev) => ({
      ...prev,
      [quizIndex]: optionIndex,
    }));
  }

  revealExplanation(quizIndex: any): void {
    this.revealedQuizzes.update((prev) => ({
      ...prev,
      [quizIndex]: true,
    }));
  }

  isAnswered(quizIndex: any): boolean {
    return this.selectedAnswers()[quizIndex] !== undefined;
  }

  isCorrect(quizIndex: any): boolean {
    const quiz = this.quizzes()[quizIndex];
    return quiz ? this.selectedAnswers()[quizIndex] === quiz.correctIndex : false;
  }
}
