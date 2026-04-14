import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  imports: [CommonModule],
})
export class SignalsComponent {
  private http: HttpClient;

  topics = signal<any[]>([]);
  loading = signal(false);

  activeTab = signal<'topics' | 'quiz' | 'analogies'>('topics');
  searchTerm = signal('');

  filteredTopics = signal<any[]>([]);

  expandedIndex = signal<number | null>(null);

  quizzes = signal<any[]>([]);
  selectedAnswers = signal<Record<number, number>>({});
  revealedQuizzes = signal<Record<number, boolean>>({});

  constructor(http: HttpClient) {
    this.http = http;

    effect(() => {
      const term = this.searchTerm().toLowerCase();
      this.filteredTopics.set(this.topics().filter((t) => t.title.toLowerCase().includes(term)));
    });

    effect(() => {
      console.log('[Signals] active tab:', this.activeTab());
    });
  }

  ngOnInit(): void {
    this.loading.set(true);

    this.http.get<any[]>('http://localhost:3000/signals/topics').subscribe({
      next: (topics) => {
        this.topics.set(topics);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });

    this.http.get<any[]>('http://localhost:3000/signals/quizzes').subscribe({
      next: (quizzes) => this.quizzes.set(quizzes),
    });
  }

  selectTab(tab: 'topics' | 'quiz' | 'analogies'): void {
    this.activeTab.set(tab);
  }

  updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
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
