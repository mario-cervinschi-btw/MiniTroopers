import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
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

  topics = signal<SignalsTopic[]>([]);
  loading = signal(false);

  activeTab = signal<'topics' | 'quiz' | 'analogies'>('topics');
  protected readonly searchControl = new FormControl('');

  filteredTopics = signal<SignalsTopic[]>([]);

  expandedIndex = signal<number | null>(null);

  quizzes = signal<SignalsQuiz[]>([]);
  selectedAnswers = signal<Record<number, number>>({});
  revealedQuizzes = signal<Record<number, boolean>>({});

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

  selectTab(tab: 'topics' | 'quiz' | 'analogies'): void {
    this.activeTab.set(tab);
  }

  toggle(index: number): void {
    this.expandedIndex.set(this.expandedIndex() === index ? null : index);
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  selectAnswer(quizIndex: number, optionIndex: number): void {
    this.selectedAnswers.update((prev) => ({ ...prev, [quizIndex]: optionIndex }));
  }

  revealExplanation(quizIndex: number): void {
    this.revealedQuizzes.update((prev) => ({ ...prev, [quizIndex]: true }));
  }

  isAnswered(quizIndex: number): boolean {
    return this.selectedAnswers()[quizIndex] !== undefined;
  }

  isCorrect(quizIndex: number): boolean {
    return this.selectedAnswers()[quizIndex] === this.quizzes()[quizIndex]?.correctIndex;
  }
}
