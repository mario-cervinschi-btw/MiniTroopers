import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { SignalsQuiz, SignalsTopic } from '../../shared/models/signals.model';
import { SignalService } from '../../shared/services/signal-service';
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

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  imports: [CommonModule, PageHeader, ReactiveFormsModule],
})
export class SignalsComponent {
  private readonly signalService = inject(SignalService);

  protected readonly topics = signal<SignalsTopic[]>([]);
  protected readonly loading = signal(false);

  protected readonly activeTab = signal<'topics' | 'quiz' | 'analogies'>('topics');
  protected readonly searchControl = new FormControl('');

  protected readonly filteredTopics = signal<SignalsTopic[]>([]);

  protected readonly expandedIndex = signal<number | null>(null);

  protected readonly quizzes = signal<SignalsQuiz[]>([]);
  protected readonly selectedAnswers = signal<Record<number, number>>({});
  protected readonly revealedQuizzes = signal<Record<number, boolean>>({});

  ngOnInit(): void {
    this.loading.set(true);

    this.signalService.fetchTopics().subscribe({
      next: (topics) => {
        this.topics.set(topics);
        this.filteredTopics.set(topics);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });

    this.signalService.fetchQuizzes().subscribe({
      next: (quizzes) => this.quizzes.set(quizzes),
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

  protected selectTab(tab: 'topics' | 'quiz' | 'analogies'): void {
    this.activeTab.set(tab);
  }

  protected toggle(index: number): void {
    this.expandedIndex.set(this.expandedIndex() === index ? null : index);
  }

  protected isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  protected selectAnswer(quizIndex: number, optionIndex: number): void {
    this.selectedAnswers.update((prev) => ({ ...prev, [quizIndex]: optionIndex }));
  }

  protected revealExplanation(quizIndex: number): void {
    this.revealedQuizzes.update((prev) => ({ ...prev, [quizIndex]: true }));
  }

  protected isAnswered(quizIndex: number): boolean {
    return this.selectedAnswers()[quizIndex] !== undefined;
  }

  protected isCorrect(quizIndex: number): boolean {
    return this.selectedAnswers()[quizIndex] === this.quizzes()[quizIndex]?.correctIndex;
  }
}
