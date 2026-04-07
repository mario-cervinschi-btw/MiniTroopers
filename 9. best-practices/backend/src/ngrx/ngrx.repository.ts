import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { NGRX_QUIZZES_SEED, NGRX_TOPICS_SEED } from './ngrx.seed';
import { NgrxFlowStep, NgrxQuiz, NgrxTopic } from './ngrx.types';

const NGRX_FLOW_STEPS: NgrxFlowStep[] = [
  {
    step: 1,
    name: 'Component',
    role: 'Triggers the cycle',
    description:
      'A lifecycle hook, user interaction, or route event prompts the component to dispatch an Action. The component knows nothing about how state will change — it fires and forgets.',
    example: `export class UsersPageComponent {
  private store = inject(Store);

  ngOnInit(): void {
    // Fire the action — the component's job is done here.
    this.store.dispatch(loadUsers());
  }

  onDelete(id: string): void {
    this.store.dispatch(deleteUser({ id }));
  }
}`,
    tip: 'A component should only dispatch actions and select data. No HTTP calls, no business logic, no direct state mutation belong here.',
  },
  {
    step: 2,
    name: 'Action',
    role: 'Describes the event',
    description:
      "The dispatched Action is a plain JS object: { type: '[Users Page] Load Users' }. It broadcasts through the NgRx runtime simultaneously to both Reducers and Effects. Each piece decides independently whether to react.",
    example: `// actions/users.actions.ts
export const loadUsers = createAction(
  '[Users Page] Load Users'
);

export const deleteUser = createAction(
  '[Users Page] Delete User',
  props<{ id: string }>()
);

// What the runtime actually sees at dispatch time:
// { type: '[Users Page] Delete User', id: 'abc-123' }`,
    tip: "Follow the '[Source] Event' naming pattern — it makes your Redux DevTools timeline a readable audit log of everything that happened in the app.",
  },
  {
    step: 3,
    name: 'Effects (optional)',
    role: 'Handles async side effects',
    description:
      'Effects intercept Actions that require async work — HTTP calls, browser API access, navigation, analytics. They perform the side effect, then dispatch a new success or failure Action when done. Reducers stay pure because all impurity lives here.',
    example: `@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),            // listen for this specific action
      switchMap(() =>
        this.api.getAll().pipe(
          map(users =>
            loadUsersSuccess({ users }) // dispatch on success
          ),
          catchError(err =>
            of(loadUsersFailure({ error: err.message }))
          )
        )
      )
    )
  );
}`,
    tip: 'If no side effect is needed (e.g. a pure UI toggle), the action flows directly to the Reducer — Effects are completely optional.',
  },
  {
    step: 4,
    name: 'Reducer',
    role: 'Computes new state',
    description:
      'The Reducer receives the current state and the incoming Action, then returns a brand-new state object. It is a pure function — same inputs always produce the same output. No mutation, no async work, no randomness allowed.',
    example: `export const usersReducer = createReducer(
  initialState,
  on(loadUsers, state => ({
    ...state,          // spread existing state first
    loading: true,     // only override what changes
    error: null
  })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users              // new reference — change detection fires!
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);`,
    tip: "Never write state.x = y inside a reducer. That mutates the same reference and makes NgRx's change detection invisible. Always return a new object with spread.",
  },
  {
    step: 5,
    name: 'Store',
    role: 'Holds the updated state',
    description:
      'The Store applies the new state snapshot returned by the Reducer and notifies all active Selectors. The previous state is preserved in Redux DevTools history, enabling time-travel debugging and action replay.',
    example: `// State snapshot before loadUsersSuccess:
{ users: [], loading: true, error: null }

// State snapshot after loadUsersSuccess:
{ users: [{ id: '1', name: 'Alice' }], loading: false, error: null }

// Redux DevTools audit trail shows every transition:
// [Users Page] Load Users        → loading: true
// [Users API] Load Users Success → loading: false, users: [...]

// Enable DevTools in app.config.ts:
provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })`,
    tip: 'Install the Redux DevTools browser extension. You can inspect every action payload, diff the before/after state, and even dispatch actions manually from the panel.',
  },
  {
    step: 6,
    name: 'Selector',
    role: 'Derives state for the view',
    description:
      'Selectors are memoized projections from the Store. When the Store updates, only Selectors whose input slice actually changed recompute. Components receive a fine-grained Observable — not raw state.',
    example: `// selectors/users.selectors.ts
const selectUsersState =
  createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  state => state.users
);

export const selectActiveUsers = createSelector(
  selectAllUsers,                        // compose selectors!
  users => users.filter(u => u.active)
);

// selectActiveUsers only recomputes when the users array
// reference changes. Unrelated state changes are ignored.`,
    tip: 'Always declare selectors as module-level constants — never create them inline inside a method. Inline selectors break memoization completely.',
  },
  {
    step: 7,
    name: 'Component (re-renders)',
    role: 'Displays the new state',
    description:
      'The Selector emits the updated projected value to the component. The async pipe in the template receives the new value, triggers change detection on the affected element only, and the UI updates — completing the unidirectional cycle.',
    example: `// users-page.component.ts
export class UsersPageComponent {
  private store = inject(Store);

  users$   = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectLoading);
  error$   = this.store.select(selectError);
}

// users-page.component.html
// <p *ngIf="loading$ | async">Loading...</p>
// <p *ngIf="error$ | async as err">Error: {{ err }}</p>
// <ul>
//   <li *ngFor="let user of users$ | async">
//     {{ user.name }}
//   </li>
// </ul>`,
    tip: 'Use the async pipe — never call .subscribe() manually in the component. It auto-unsubscribes on destroy and triggers change detection correctly with OnPush.',
  },
];

@Injectable()
export class NgrxRepository {
  private readonly db: Database.Database;

  constructor() {
    const dbPath = resolve(process.cwd(), 'data', 'practices.sqlite');
    mkdirSync(dirname(dbPath), { recursive: true });
    this.db = new Database(dbPath);
    this.createSchema();
    this.seedWhenEmpty();
  }

  findAllTopics(): NgrxTopic[] {
    const query = this.db.prepare(`
      SELECT
        title,
        description,
        key_points   AS keyPoints,
        example,
        analogy,
        tag,
        order_index  AS orderIndex
      FROM ngrx_topics
      ORDER BY order_index ASC;
    `);

    return (
      query.all() as Array<Omit<NgrxTopic, 'keyPoints'> & { keyPoints: string }>
    ).map((row) => ({
      ...row,
      keyPoints: JSON.parse(row.keyPoints) as string[],
    }));
  }

  findAllQuizzes(): NgrxQuiz[] {
    const query = this.db.prepare(`
      SELECT
        question,
        code_snippet  AS codeSnippet,
        options,
        correct_index AS correctIndex,
        explanation,
        order_index   AS orderIndex
      FROM ngrx_quizzes
      ORDER BY order_index ASC;
    `);

    return (
      query.all() as Array<Omit<NgrxQuiz, 'options'> & { options: string }>
    ).map((row) => ({
      ...row,
      options: JSON.parse(row.options) as string[],
    }));
  }

  findFlowSteps(): NgrxFlowStep[] {
    return NGRX_FLOW_STEPS;
  }

  private createSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS ngrx_topics (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT    NOT NULL,
        description TEXT    NOT NULL,
        key_points  TEXT    NOT NULL,
        example     TEXT    NOT NULL,
        analogy     TEXT    NOT NULL DEFAULT '',
        tag         TEXT    NOT NULL,
        order_index INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ngrx_quizzes (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        question      TEXT    NOT NULL,
        code_snippet  TEXT    NOT NULL,
        options       TEXT    NOT NULL,
        correct_index INTEGER NOT NULL,
        explanation   TEXT    NOT NULL,
        order_index   INTEGER NOT NULL
      );
    `);
  }

  private seedWhenEmpty(): void {
    const topicsCount = this.db
      .prepare('SELECT COUNT(*) AS count FROM ngrx_topics;')
      .get() as { count: number };

    if (topicsCount.count === 0) {
      const insert = this.db.prepare(`
        INSERT INTO ngrx_topics
          (title, description, key_points, example, analogy, tag, order_index)
        VALUES
          (@title, @description, @keyPoints, @example, @analogy, @tag, @orderIndex);
      `);

      this.db.transaction((topics: NgrxTopic[]) => {
        for (const topic of topics) {
          insert.run({ ...topic, keyPoints: JSON.stringify(topic.keyPoints) });
        }
      })(NGRX_TOPICS_SEED);
    }

    const quizzesCount = this.db
      .prepare('SELECT COUNT(*) AS count FROM ngrx_quizzes;')
      .get() as { count: number };

    if (quizzesCount.count === 0) {
      const insert = this.db.prepare(`
        INSERT INTO ngrx_quizzes
          (question, code_snippet, options, correct_index, explanation, order_index)
        VALUES
          (@question, @codeSnippet, @options, @correctIndex, @explanation, @orderIndex);
      `);

      this.db.transaction((quizzes: NgrxQuiz[]) => {
        for (const quiz of quizzes) {
          insert.run({ ...quiz, options: JSON.stringify(quiz.options) });
        }
      })(NGRX_QUIZZES_SEED);
    }
  }
}
