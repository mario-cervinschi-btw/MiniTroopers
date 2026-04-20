import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { SignalsQuiz, SignalsTopic } from '../../shared/models/signals.model';
import { SignalService } from '../../shared/services/signal-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CollapsableCard } from '../../shared/components/collapsable-card/collapsable-card';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  imports: [PageHeader, ReactiveFormsModule, CollapsableCard],
})
export class SignalsComponent implements OnInit {
  private readonly signalService = inject(SignalService);
  private readonly destroyRef = inject(DestroyRef);

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

    this.signalService
      .fetchTopics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (topics) => {
          this.topics.set(topics);
          this.filteredTopics.set(topics);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });

    this.signalService
      .fetchQuizzes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (quizzes) => this.quizzes.set(quizzes),
      });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((term) => (term ?? '').toLowerCase()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((term) => {
        const filtered = this.topics().filter((t) => t.title.toLowerCase().includes(term));
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
