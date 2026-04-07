import { SignalsQuiz, SignalsTopic } from './signals.types';

export const SIGNALS_TOPICS_SEED: SignalsTopic[] = [
  {
    title: 'signal()',
    tag: 'core',
    orderIndex: 1,
    description:
      'A signal is a reactive primitive that holds a value and notifies all consumers when that value changes. Created with signal(initialValue), read by calling it as a function, and updated with .set() or .update().',
    analogy:
      '🔔 A notification bell on a website: when the counter changes from 3 to 4, every part of the page showing the bell icon updates automatically — without anyone polling for the new value.',
    keyPoints: [
      'Read a signal by calling it: count() — not count',
      'Update with .set(newValue) or .update(prev => newValue)',
      'Any template or computed() that reads a signal re-evaluates on change',
      'Signals are synchronous — no async, no subscriptions needed',
    ],
    example: `import { signal } from '@angular/core';

export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(n => n + 1);
  }

  reset() {
    this.count.set(0);
  }
}

// Template — no async pipe needed:
// <p>{{ count() }}</p>`,
  },
  {
    title: 'computed()',
    tag: 'core',
    orderIndex: 2,
    description:
      'computed() creates a read-only derived signal whose value is automatically recalculated whenever its signal dependencies change. It is lazy (only evaluated when read) and memoized (cached until a dependency changes).',
    analogy:
      '🧮 A spreadsheet formula: =A1+B1 updates automatically whenever A1 or B1 changes. You never have to manually recalculate it — and it only recalculates when an input changes, not on every keystroke.',
    keyPoints: [
      'Read-only — you cannot call .set() or .update() on a computed signal',
      'Lazy: only evaluates when it (or something that depends on it) is read',
      'Memoized: caches the last result and skips recalculation when deps are unchanged',
      'Use computed() instead of effect() whenever you are deriving one value from another',
    ],
    example: `import { signal, computed } from '@angular/core';

export class CartComponent {
  items = signal<CartItem[]>([]);

  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0)
  );

  itemCount = computed(() => this.items().length);
}

// Template:
// <p>{{ itemCount() }} items — \${{ totalPrice() }}</p>`,
  },
  {
    title: 'effect()',
    tag: 'core',
    orderIndex: 3,
    description:
      'effect() registers a side effect that re-runs whenever any signal it reads changes. It is meant for work that reaches outside the reactive graph: logging, DOM manipulation, syncing to localStorage. It must be called inside an injection context.',
    analogy:
      '🔌 An electrical socket: anything plugged in (the side effect) powers on whenever voltage (the signal value) flows. Unplug it (destroy the component) and the socket stops automatically.',
    keyPoints: [
      'Must be called in an injection context: constructor, field initializer, or with a provided Injector',
      'Automatically cleans up when the owning context is destroyed',
      'Do NOT use effect() to sync one signal from another — use computed() for that',
      'Returns an EffectRef you can call .destroy() on to stop it manually',
    ],
    example: `import { signal, effect } from '@angular/core';

export class ThemeComponent {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    // Sync theme preference to localStorage on every change
    effect(() => {
      localStorage.setItem('theme', this.theme());
    });
  }

  toggle() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}`,
  },
  {
    title: 'input() signals',
    tag: 'angular',
    orderIndex: 4,
    description:
      'Angular 17.1 introduced signal-based component inputs. Declared with input() instead of @Input(), they expose the parent binding as a read-only Signal<T> inside the component — no ngOnChanges or setters needed.',
    analogy:
      '📬 A smart mailbox with a live indicator: instead of checking for new mail on a schedule (@Input with ngOnChanges), the light above the slot automatically turns on the moment a letter arrives (input() signal).',
    keyPoints: [
      'input<T>() — optional input, value is T | undefined',
      'input<T>(defaultValue) — optional input with a fallback',
      'input.required<T>() — required input, throws if not provided',
      'Read in template or computed() just like any signal: userId()',
    ],
    example: `import { Component, input, computed } from '@angular/core';

@Component({ selector: 'app-user-card', template: '...' })
export class UserCardComponent {
  userId = input.required<string>();
  label = input('Anonymous');  // default value

  displayName = computed(() =>
    \`User #\${this.userId()} — \${this.label()}\`
  );
}

// Parent:
// <app-user-card userId="42" label="Alice" />`,
  },
  {
    title: 'toSignal()',
    tag: 'best-practice',
    orderIndex: 5,
    description:
      'toSignal() from @angular/core/rxjs-interop bridges an Observable into the Signal world. It subscribes to the Observable, stores the latest emission as a signal value, and automatically unsubscribes when the component is destroyed.',
    analogy:
      '🔄 A live news ticker converted into a pinned headline: the ticker (Observable) streams continuously, but toSignal wraps it so your component always sees the latest headline as a plain synchronous value — no .subscribe(), no async pipe, no manual teardown.',
    keyPoints: [
      'Must be called in an injection context (same rule as effect)',
      'Accepts an initialValue option to avoid dealing with undefined on first read',
      'Automatically unsubscribes — no takeUntilDestroyed() needed',
      'Prefer toSignal() over manually calling .subscribe() then signal.set() in a component',
    ],
    example: `import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({ selector: 'app-users', template: '...' })
export class UsersComponent {
  private http = inject(HttpClient);

  // No ngOnInit, no subscribe, no unsubscribe:
  users = toSignal(
    this.http.get<User[]>('/api/users'),
    { initialValue: [] }
  );
}

// Template:
// <li *ngFor="let user of users()">{{ user.name }}</li>`,
  },
  {
    title: 'Signals & Change Detection',
    tag: 'best-practice',
    orderIndex: 6,
    description:
      'Signals integrate natively with Angular change detection. Components that read signals are tracked automatically — Angular re-runs only the view subtrees that depend on changed signals. With ChangeDetectionStrategy.OnPush, signals give you fine-grained updates with zero manual markForCheck() calls.',
    analogy:
      '🏠 Smart home lighting: each room has a motion sensor (signal). The lights in a room (the view) only turn on or off when motion in THAT room changes — not whenever someone moves anywhere in the house. OnPush + Signals = room-level precision, not house-level polling.',
    keyPoints: [
      'Angular 17+ components with signals re-render only when their signal dependencies change',
      'Works best with ChangeDetectionStrategy.OnPush for maximum efficiency',
      'No need for markForCheck() or detectChanges() when using signals',
      'Angular 18+ introduced experimental Zoneless mode — signals power CD entirely without Zone.js',
    ],
    example: `@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>{{ title() }}</p>
    <ul>
      <li *ngFor="let item of items()">{{ item.name }}</li>
    </ul>
  \`
})
export class DashboardComponent {
  title = signal('Dashboard');
  items = signal<Item[]>([]);

  // Angular tracks which signals this template reads.
  // Only this component re-renders when title() or items() change.
}`,
  },
];

export const SIGNALS_QUIZZES_SEED: SignalsQuiz[] = [
  {
    question:
      'Spot the bug: filtered results are recomputed more often than needed and the code is harder to compose.',
    codeSnippet: `@Component({ ... })
export class ProductsComponent {
  searchTerm = signal('');
  allProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  constructor() {
    effect(() => {
      const term = this.searchTerm().toLowerCase();
      this.filteredProducts.set(
        this.allProducts().filter(p =>
          p.name.toLowerCase().includes(term)
        )
      );
    });
  }
}`,
    options: [
      'effect() cannot read two signals at the same time',
      'filteredProducts should be a computed() signal — effect() is for side effects that reach outside the reactive graph, not for deriving one signal value from another',
      'signal.set() cannot be called inside an effect — this will throw at runtime',
      'The filter predicate is missing a null check on p.name',
    ],
    correctIndex: 1,
    explanation:
      'Whenever you need a value derived from other signals, use computed() — not effect(). computed() is lazy, memoized, and part of the reactive graph. effect() is for side effects like writing to localStorage or the DOM. Using effect() to write back into another signal adds unnecessary indirection, runs eagerly on every change, and breaks composability. Fix: filteredProducts = computed(() => this.allProducts().filter(...))',
    orderIndex: 1,
  },
  {
    question: 'Spot the bug: this code throws a runtime error in production.',
    codeSnippet: `@Component({ selector: 'app-tracker', template: '...' })
export class TrackerComponent implements OnInit {
  visits = signal(0);

  ngOnInit(): void {
    effect(() => {
      console.log('visit count:', this.visits());
      localStorage.setItem('visits', String(this.visits()));
    });
  }
}`,
    options: [
      'localStorage.setItem cannot be called inside an effect',
      'effect() must be called in an injection context — a constructor, a field initializer, or with an explicit injector. ngOnInit runs outside that context and throws NG0203',
      'visits() cannot be read inside ngOnInit because the signal is not yet initialized',
      'console.log and localStorage.setItem cannot both run in the same effect',
    ],
    correctIndex: 1,
    explanation:
      "Angular's effect() requires an injection context because it needs to tie its lifetime to an injector (usually the component's). ngOnInit is called after the constructor, outside that scope. Fix: move the effect() call into the constructor — or into a field initializer — where the injection context is available.",
    orderIndex: 2,
  },
  {
    question:
      'Spot the bug: the component leaks a subscription on every navigation.',
    codeSnippet: `import { toObservable } from '@angular/core/rxjs-interop';

@Component({ selector: 'app-status', template: '...' })
export class StatusComponent implements OnInit {
  isOnline = signal(true);

  ngOnInit(): void {
    toObservable(this.isOnline).subscribe(online => {
      console.log('online status changed:', online);
    });
  }
}`,
    options: [
      'toObservable() cannot be used inside ngOnInit',
      'The subscribe callback must return the subscription for cleanup',
      'toObservable() needs to be called in an injection context — calling it in ngOnInit skips that requirement, and the resulting subscription is never unsubscribed when the component is destroyed',
      'toObservable() only supports BehaviorSubject, not signal()',
    ],
    correctIndex: 2,
    explanation:
      'toObservable() must be called in an injection context (constructor or field initializer) so Angular can auto-unsubscribe through DestroyRef when the component is destroyed. Calling it in ngOnInit creates an Observable subscription with no cleanup — every time the component is created the subscription leaks. Fix: move it to the constructor, or better yet, just use effect() for logging side effects and avoid the Observable entirely.',
    orderIndex: 4,
  },
];
