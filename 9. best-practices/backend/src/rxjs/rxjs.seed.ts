import { RxjsQuiz, RxjsTopic } from './rxjs.types';

export const RXJS_SEED: RxjsTopic[] = [
  {
    title: 'Observable',
    tag: 'core',
    orderIndex: 1,
    description:
      'The foundation of RxJS. An Observable is a lazy push-based collection that can emit zero or more values over time and then complete or error.',
    analogy:
      '📺 A Netflix show: nothing plays until you press Play (subscribe). Each viewer gets their own independent playback — pausing yours does not affect others.',
    keyPoints: [
      'Lazy — nothing happens until you subscribe',
      'Can be synchronous or asynchronous',
      'Unicast by default — each subscriber gets an independent execution',
      'Must be unsubscribed to avoid memory leaks',
    ],
    example: `const obs$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});
obs$.subscribe(val => console.log(val)); // 1, 2`,
  },
  {
    title: 'Subject',
    tag: 'core',
    orderIndex: 2,
    description:
      'A Subject is both an Observable and an Observer. It is multicast — all subscribers share the same execution.',
    analogy:
      '📻 A live radio broadcast: the station plays once and everyone tuned in hears the same thing at the same time. Joining late means you missed what already played.',
    keyPoints: [
      'Multicast: one source, many subscribers',
      'Can manually push values with .next()',
      'BehaviorSubject holds the last emitted value',
      'ReplaySubject replays N past values to new subscribers',
    ],
    example: `const subject = new Subject<number>();
subject.subscribe(v => console.log('A', v));
subject.subscribe(v => console.log('B', v));
subject.next(1); // A 1, B 1`,
  },
  {
    title: 'Operators — Transformation',
    tag: 'operators',
    orderIndex: 3,
    description:
      'Transformation operators produce a new Observable by changing each emitted value.',
    analogy:
      '🎬 switchMap is like changing a Spotify song mid-play — the previous song stops immediately. mergeMap plays all songs at once. concatMap queues them — one finishes before the next starts.',
    keyPoints: [
      'map — transform each value',
      'switchMap — cancel previous inner observable on new emission',
      'mergeMap — allow multiple concurrent inner observables',
      'concatMap — queue inner observables one at a time',
    ],
    example: `clicks$.pipe(
  switchMap(() => this.http.get('/api/data'))
).subscribe(data => console.log(data));`,
  },
  {
    title: 'Operators — Filtering',
    tag: 'operators',
    orderIndex: 4,
    description:
      'Filtering operators let only certain values through to the subscriber.',
    analogy:
      '🔍 debounceTime is like Google search suggestions — they only appear after you stop typing. The stream waits for silence before reacting.',
    keyPoints: [
      'filter — only pass values matching a predicate',
      'take — complete after N values',
      'debounceTime — wait for silence before emitting',
      'distinctUntilChanged — suppress consecutive duplicates',
    ],
    example: `input$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  filter(term => term.length > 2)
).subscribe(term => search(term));`,
  },
  {
    title: 'takeUntilDestroyed',
    tag: 'best-practice',
    orderIndex: 5,
    description:
      'The modern Angular way to automatically unsubscribe when a component is destroyed, replacing manual ngOnDestroy teardown.',
    analogy:
      '🍕 Cancelling a food delivery when you leave the restaurant. You no longer need the order — leaving should automatically cancel it, not leave a ghost subscription running forever.',
    keyPoints: [
      'Introduced in Angular 16',
      'Must be called in an injection context (field initializer or constructor)',
      'Replaces Subject + takeUntil pattern',
      'Works with DestroyRef for non-component contexts',
    ],
    example: `http.get('/api').pipe(
  takeUntilDestroyed()
).subscribe(data => this.data = data);`,
  },
  {
    title: 'async pipe',
    tag: 'best-practice',
    orderIndex: 6,
    description:
      'Subscribe to an Observable directly in the template. Angular handles subscription, change detection, and unsubscription automatically.',
    analogy:
      '🤖 A self-cleaning coffee machine. You press the button once — it brews, serves, and cleans up on its own. No manual teardown needed.',
    keyPoints: [
      'No manual subscribe/unsubscribe needed',
      'Marks the view for check on each emission',
      'Works great with OnPush change detection',
      'Null-safe: renders nothing while stream is pending',
    ],
    example: `// component
data$ = this.http.get<Item[]>('/api/items');

// template
<li *ngFor="let item of data$ | async">{{ item.name }}</li>`,
  },
  {
    title: 'Cold vs Hot Observables',
    tag: 'concept',
    orderIndex: 7,
    description:
      'Cold observables start a fresh producer for each subscriber. Hot observables share a single producer across all subscribers.',
    analogy:
      '🏟️ Cold = a recorded match on YouTube (each viewer watches from the start). Hot = a live match on TV (everyone watches the same moment, latecomers miss the start).',
    keyPoints: [
      'HTTP calls are cold — each subscribe triggers a new request',
      'DOM events and WebSockets are hot — they exist independently',
      'share() / shareReplay() convert cold to hot',
      'BehaviorSubject is always hot',
    ],
    example: `// Make an HTTP call hot and cache the last result:
const data$ = this.http.get('/api').pipe(
  shareReplay(1)
);`,
  },
  {
    title: 'Error Handling',
    tag: 'best-practice',
    orderIndex: 8,
    description:
      'Unhandled errors complete the stream. Use operators to recover gracefully.',
    analogy:
      '🚨 A circuit breaker in your home: when there is a fault, it trips and stops the current. catchError is your chance to reset the breaker instead of leaving everything off.',
    keyPoints: [
      'catchError — recover or rethrow',
      'retry / retryWhen — re-subscribe on error',
      'EMPTY — complete silently without emitting',
      'Always handle errors to keep streams alive',
    ],
    example: `this.http.get('/api').pipe(
  catchError(err => {
    console.error(err);
    return EMPTY;
  })
).subscribe(data => this.data = data);`,
  },
];

export const RXJS_QUIZZES_SEED: RxjsQuiz[] = [
  {
    question: 'Spot the bug: this component leaks memory. What is wrong?',
    codeSnippet: `@Component({ selector: 'app-user', template: '...' })
export class UserComponent implements OnInit {
  user: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/user')
      .subscribe(data => this.user = data);
  }
}`,
    options: [
      'Missing error handler in subscribe',
      'The subscription is never unsubscribed — it leaks when the component is destroyed',
      'HttpClient should not be used in ngOnInit',
      'subscribe() should be replaced with async/await',
    ],
    correctIndex: 1,
    explanation:
      'The HTTP Observable completes by itself here, but if this were a long-lived stream (e.g. interval, Subject, Router events) the subscription would keep the component alive in memory after it is destroyed. Best practice: store the Subscription and call .unsubscribe() in ngOnDestroy, or use takeUntilDestroyed().',
    orderIndex: 1,
  },
  {
    question: 'Spot the bug: the search box fires too many HTTP requests.',
    codeSnippet: `this.searchControl.valueChanges
  .pipe(
    mergeMap(query => this.http.get(\`/api/search?q=\${query}\`))
  )
  .subscribe(results => this.results = results);`,
    options: [
      'mergeMap should be switchMap — it must cancel the previous request when a new keystroke arrives',
      'valueChanges should be wrapped in fromEvent instead',
      'pipe() cannot accept mergeMap directly',
      'The subscribe callback is missing an error handler',
    ],
    correctIndex: 0,
    explanation:
      'mergeMap fires all requests in parallel and merges their results in arrival order. For a search box, old responses can arrive after newer ones, causing stale results. switchMap cancels the in-flight request whenever a new value arrives, which is exactly what you want for typeahead search.',
    orderIndex: 2,
  },
  {
    question: 'Spot the bug: the error crashes the whole stream permanently.',
    codeSnippet: `interval(1000).pipe(
  switchMap(() => this.http.get('/api/data'))
).subscribe(
  data => this.data = data
);`,
    options: [
      'interval should be timer instead',
      'switchMap is the wrong operator here — use mergeMap',
      'There is no catchError — a single HTTP failure will terminate the entire interval stream',
      'The subscribe callback needs a second argument for completion',
    ],
    correctIndex: 2,
    explanation:
      'When an unhandled error propagates to subscribe(), RxJS terminates the stream. The interval stops polling permanently. Fix: add catchError inside the pipe (ideally inside the switchMap projection) to recover and keep the outer stream alive.',
    orderIndex: 3,
  },
  {
    question:
      'Spot the bug: the BehaviorSubject subscriber misses the initial value.',
    codeSnippet: `const state$ = new Subject<string>();
state$.next('loading');

// --- later in a child component ---
state$.subscribe(val => console.log(val)); // never prints 'loading'`,
    options: [
      'Subject.next() cannot be called before subscribe()',
      'Subject is fine — BehaviorSubject would not help here',
      'Subject does not replay past values. Use BehaviorSubject to emit the current value to late subscribers',
      'The subscription should use take(1) to get the latest value',
    ],
    correctIndex: 2,
    explanation:
      'A plain Subject only emits to subscribers that are active at the moment next() is called. BehaviorSubject stores the latest value and immediately emits it to any new subscriber — perfect for sharing current state across components.',
    orderIndex: 4,
  },
  {
    question:
      'Spot the bug: requests run sequentially but the author expected parallel execution.',
    codeSnippet: `const ids = [1, 2, 3];

from(ids).pipe(
  concatMap(id => this.http.get(\`/api/item/\${id}\`))
).subscribe(item => this.items.push(item));`,
    options: [
      'from() does not work with arrays',
      'concatMap waits for each request to complete before starting the next — use forkJoin for parallel execution over a fixed list',
      'concatMap is correct; push() is the real bug',
      'subscribe should collect into an array with toArray() first',
    ],
    correctIndex: 1,
    explanation:
      'concatMap serialises inner Observables: request 2 only starts after request 1 completes. For a fixed array of independent requests, forkJoin(ids.map(id => this.http.get(...))) fires them all in parallel and emits once when all complete.',
    orderIndex: 5,
  },
  {
    question:
      'Spot the bug: the template re-renders on every change-detection cycle.',
    codeSnippet: `@Component({
  template: \`
    <div *ngFor="let item of getData()">{{ item.name }}</div>
  \`
})
export class ListComponent {
  getData() {
    return this.http.get<any[]>('/api/items');
  }
}`,
    options: [
      'getData() returns an Observable — calling it directly in the template creates a new subscription on every change-detection cycle',
      'http.get() should not be called in a component method',
      '*ngFor needs a trackBy function to work with Observables',
      'The template should use *ngIf to guard against null',
    ],
    correctIndex: 0,
    explanation:
      'Calling a method that returns an Observable directly in the template causes Angular to create a new subscription every change-detection cycle (potentially dozens per second). Fix: use the async pipe with a stored Observable property — or store the resolved array. The async pipe also handles unsubscription automatically.',
    orderIndex: 6,
  },
];
