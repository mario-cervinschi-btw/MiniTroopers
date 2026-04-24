import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NgrxService } from '../../shared/services/ngrx-service';
import { NgrxFacade } from '../../shared/stores/ngrx-store/ngrx.facade';
import { filter } from 'rxjs';
import { Quiz } from '../../shared/models/quiz.model';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss',
  imports: [],
})
export class NgrxComponent implements OnInit {
  private readonly ngrxService = inject(NgrxService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngrxFacade = inject(NgrxFacade);

  protected readonly topics = toSignal(this.ngrxFacade.selectAllTopics$);
  protected readonly loading = toSignal(this.ngrxFacade.selectLoading$);

  protected readonly quizzes = signal<Quiz[]>([]);
  protected readonly activeTab = signal<'concepts' | 'flow' | 'quiz' | 'analogies'>('concepts');
  protected readonly expandedIndex = signal<number | null>(null);

  protected readonly selectedAnswers = signal<Record<number, number>>({});
  protected readonly revealedQuizzes = signal<Record<number, boolean>>({});

  protected readonly errorMessage = signal<string>('');

  ngOnInit(): void {
    this.initData();
  }

  private initData() {
    this.ngrxFacade.loadTopics();
    this.errorMessage.set('');

    this.ngrxFacade.selectError$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((err) => err !== null),
      )
      .subscribe((err) => {
        this.errorMessage.update((msg) => msg + 'Load topics error: ' + err + '. ');
      });

    this.ngrxService
      .fetchQuizzes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => this.quizzes.set(data),
        error: (err) =>
          this.errorMessage.update((msg) => msg + 'Load quizzes error: ' + err.statusText + '. '),
      });
  }

  protected selectTab(tab: 'concepts' | 'flow' | 'quiz' | 'analogies'): void {
    this.activeTab.set(tab);
  }

  protected toggle(index: number): void {
    this.expandedIndex.update((current) => (current === index ? null : index));
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
    return this.selectedAnswers()[quizIndex] === this.quizzes()[quizIndex]?.correctIndex;
  }
}
