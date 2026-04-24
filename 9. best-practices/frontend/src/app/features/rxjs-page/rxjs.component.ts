import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { RxjsService } from '../../shared/services/rxjs-service';
import { RxjsQuiz, RxjsTopic } from '../../shared/models/rxjs.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  imports: [ReactiveFormsModule, PageHeader],
})
export class RxjsComponent implements OnInit {
  private rxjsService = inject(RxjsService);
  private destroyRef = inject(DestroyRef);

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
    this.rxjsService
      .fetchTopics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((topics: RxjsTopic[]) => {
        this.topics.set(topics);
        this.filteredTopics.set(topics);
        this.loading.set(false);
      });

    this.rxjsService
      .fetchQuizzes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((quizzes: RxjsQuiz[]) => {
        this.quizzes.set(quizzes);
      });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((term) => (term ?? '').toLowerCase()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((term) => {
        const filtered = this.topics().filter((t: RxjsTopic) =>
          t.title.toLowerCase().includes(term),
        );
        this.filteredTopics.set(filtered);
      });
  }

  protected selectTab(tab: 'topics' | 'quiz' | 'analogies'): void {
    this.activeTab.set(tab);
  }

  protected toggle(index: number): void {
    const val = this.expandedIndex() === index ? null : index;
    this.expandedIndex.set(val);
  }

  protected isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  protected selectAnswer(quizIndex: number, optionIndex: number): void {
    this.selectedAnswers.update((prev) => ({
      ...prev,
      [quizIndex]: optionIndex,
    }));
  }

  protected revealExplanation(quizIndex: number): void {
    this.revealedQuizzes.update((prev) => ({
      ...prev,
      [quizIndex]: true,
    }));
  }

  protected isAnswered(quizIndex: number): boolean {
    return this.selectedAnswers()[quizIndex] !== undefined;
  }

  protected isCorrect(quizIndex: number): boolean {
    const quiz = this.quizzes()[quizIndex];
    return quiz ? this.selectedAnswers()[quizIndex] === quiz.correctIndex : false;
  }
}
