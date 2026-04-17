import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loadTopics } from '../../shared/stores/ngrx-store/ngrx.actions';
import { selectAllTopics, selectLoading } from '../../shared/stores/ngrx-store/ngrx.selectors';
import { NgrxQuiz } from '../../shared/models/ngrx.model';
import { NgrxService } from '../../shared/services/ngrx-service';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss',
  imports: [],
})
export class NgrxComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly ngrxService = inject(NgrxService);
  private readonly destroyRef = inject(DestroyRef);

  protected topics = toSignal(this.store.select(selectAllTopics));
  protected loading = toSignal(this.store.select(selectLoading));

  protected quizzes = signal<NgrxQuiz[]>([]);
  protected activeTab = signal<'concepts' | 'flow' | 'quiz' | 'analogies'>('concepts');
  protected expandedIndex = signal<number | null>(null);

  protected selectedAnswers = signal<Record<number, number>>({});
  protected revealedQuizzes = signal<Record<number, boolean>>({});

  ngOnInit(): void {
    this.initData();
  }

  private initData() {
    this.store.dispatch(loadTopics());

    this.ngrxService
      .fetchQuizzes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => this.quizzes.set(data));
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
