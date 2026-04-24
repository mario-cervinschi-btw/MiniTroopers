import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NgrxQuiz } from '../../shared/models/ngrx.model';
import { NgrxService } from '../../shared/services/ngrx-service';
import { NgrxFacade } from '../../shared/stores/ngrx-store/ngrx.facade';

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

  protected topics = toSignal(this.ngrxFacade.selectAllTopics$);
  protected loading = toSignal(this.ngrxFacade.selectLoading$);

  protected quizzes = signal<NgrxQuiz[]>([]);
  protected activeTab = signal<'concepts' | 'flow' | 'quiz' | 'analogies'>('concepts');
  protected expandedIndex = signal<number | null>(null);

  protected selectedAnswers = signal<Record<number, number>>({});
  protected revealedQuizzes = signal<Record<number, boolean>>({});

  ngOnInit(): void {
    this.initData();
  }

  private initData() {
    this.ngrxFacade.loadTopics();

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
