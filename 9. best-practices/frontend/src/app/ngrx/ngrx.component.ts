import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTopics } from './ngrx.actions';
import { selectAllTopics, selectError, selectLoading } from './ngrx.selectors';
import { NgrxQuiz, NgrxTopic } from './ngrx.types';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss',
  imports: [CommonModule],
})
export class NgrxComponent implements OnInit {
  private store = inject(Store);
  private http = inject(HttpClient);

  topics$: Observable<NgrxTopic[]> = this.store.select(selectAllTopics);
  loading$: Observable<any> = this.store.select(selectLoading);

  quizzes: NgrxQuiz[] = [];

  activeTab: 'concepts' | 'flow' | 'quiz' | 'analogies' = 'concepts';
  expandedIndex: number | null = null;

  selectedAnswers: Record<number, number> = {};
  revealedQuizzes: Record<number, boolean> = {};

  ngOnInit(): void {
    this.store.dispatch(loadTopics());

    this.http
      .get<NgrxQuiz[]>('http://localhost:3000/ngrx/quizzes')
      .subscribe((quizzes) => (this.quizzes = quizzes));
  }

  selectTab(tab: 'concepts' | 'flow' | 'quiz' | 'analogies'): void {
    this.activeTab = tab;
  }

  toggle(index: any): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: any): boolean {
    return this.expandedIndex === index;
  }

  selectAnswer(quizIndex: any, optionIndex: number): void {
    this.selectedAnswers[quizIndex] = optionIndex;
  }

  revealExplanation(quizIndex: any): void {
    this.revealedQuizzes[quizIndex] = true;
  }

  isAnswered(quizIndex: any): boolean {
    return this.selectedAnswers[quizIndex] !== undefined;
  }

  isCorrect(quizIndex: any): boolean {
    return this.selectedAnswers[quizIndex] === this.quizzes[quizIndex]?.correctIndex;
  }
}
