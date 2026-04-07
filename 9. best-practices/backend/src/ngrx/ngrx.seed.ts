import { NgrxQuiz, NgrxTopic } from './ngrx.types';

export const NGRX_TOPICS_SEED: NgrxTopic[] = [
  {
    title: 'Store',
    tag: 'core',
    orderIndex: 1,
    description:
      'The Store is a single, immutable JS object tree holding the entire application state. You never read or write it directly — components select slices via Selectors and trigger changes via Actions.',
    analogy:
      '🏛️ A government records database: citizens (components) file application forms (actions) that go through official processes (reducers) to update the official records (store). No one walks in and edits the database directly.',
    keyPoints: [
      'Single source of truth — one object tree holds all state',
      'Immutable — never mutated, always replaced with a new snapshot',
      'Reactive — exposes state as Observables via store.select(selector)',
      'Enables time-travel debugging via Redux DevTools',
    ],
    example: `// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ users: usersReducer }),
    provideEffects([UsersEffects])
  ]
};

// In a component — read state
users$ = this.store.select(selectAllUsers);

// In a component — trigger a change
this.store.dispatch(loadUsers());`,
  },
  {
    title: 'Actions',
    tag: 'core',
    orderIndex: 2,
    description:
      'Actions are plain JS objects with a required type property that describe what happened in the app. They carry the payload needed for the state change but never perform the change themselves.',
    analogy:
      "📨 An email notification: 'Your order has shipped.' It describes a past event — it does not tell the warehouse to pack the box. Actions are facts, not commands.",
    keyPoints: [
      'Always created with createAction() for full type safety',
      "Follow the convention: '[Source] Event Description' (past tense)",
      'Payload typed via the props<T>() helper',
      'Avoid imperative names like setUsers — prefer loadUsersSuccess',
    ],
    example: `export const loadUsers = createAction(
  '[Users Page] Load Users'
);

export const loadUsersSuccess = createAction(
  '[Users API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users API] Load Users Failure',
  props<{ error: string }>()
);`,
  },
  {
    title: 'Reducers',
    tag: 'core',
    orderIndex: 3,
    description:
      'Reducers are pure functions: (currentState, action) => newState. They are the ONLY place that transforms state, and they must do so by returning a new object — never mutating the existing one.',
    analogy:
      '📒 A bank ledger: you never cross out an old entry. You write a new row reflecting the updated balance. History is preserved — the ledger grows but the past is never erased.',
    keyPoints: [
      'Must be pure — no HTTP calls, no side effects, no random values',
      'Always return a NEW object: { ...state, changed: newValue }',
      'Use createReducer() with on() handlers — no more switch/case',
      'initialState defines the default state shape and its TypeScript type',
    ],
    example: `const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state, loading: false, users
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state, loading: false, error
  }))
);`,
  },
  {
    title: 'Effects',
    tag: 'core',
    orderIndex: 4,
    description:
      'Effects handle side effects outside the reducer — HTTP calls, navigation, localStorage, analytics. They listen for Actions, perform async work, and dispatch new success or failure Actions when done. Reducers stay pure; all impurity lives here.',
    analogy:
      '🕵️ A private detective: you file a request (dispatch an action), the detective quietly investigates (HTTP call), then reports back with findings (dispatches success/failure action). The component just waits — it never does the investigation itself.',
    keyPoints: [
      'Use Actions + ofType() to intercept specific actions',
      'Always handle errors inside the pipe with catchError',
      'switchMap: cancel previous in-flight request (search, page load)',
      'concatMap: queue in order | exhaustMap: ignore while already busy',
    ],
    example: `@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.usersService.getAll().pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(err =>
            of(loadUsersFailure({ error: err.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}
}`,
  },
  {
    title: 'Selectors',
    tag: 'core',
    orderIndex: 5,
    description:
      'Selectors are memoized functions that project slices of state for components. They only recompute when their upstream input changes. They compose — you can build complex derived queries from simple ones.',
    analogy:
      '🔭 A telescope with interchangeable lenses: point it at the sky (store), swap lenses (selectors) to focus on different objects — without moving the telescope. The lens remembers its last position (memoization) and only adjusts when something actually moves.',
    keyPoints: [
      'createFeatureSelector<T>(featureName) grabs a top-level state slice',
      'createSelector(inputSelector, projector) = memoized projection',
      'Selectors compose — pass one selector as input to another',
      'Never inline store.select(state => state.users) — that breaks memoization',
    ],
    example: `const selectUsersState =
  createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  state => state.users
);

export const selectActiveUsers = createSelector(
  selectAllUsers,
  users => users.filter(u => u.active) // only recomputes when users changes
);

// In component
activeUsers$ = this.store.select(selectActiveUsers);`,
  },
  {
    title: 'Feature State',
    tag: 'best-practice',
    orderIndex: 6,
    description:
      'Feature State slices the global store per feature or lazy-loaded route. Each feature owns its reducer and selectors, registered lazily to keep bundle size small. createFeature co-locates everything and auto-generates selectors.',
    analogy:
      "🏢 A multi-tenant office building: each company (feature) has its own locked floor (state slice). They share the building's infrastructure (store) but cannot access each other's space. Moving out (route unmount) clears the floor automatically.",
    keyPoints: [
      'createFeature auto-generates selectFeatureState and child selectors',
      'Register with provideState() in route providers for lazy loading',
      'State is automatically cleaned up when the lazy route is destroyed',
      'Avoids one massive root reducer — each feature is a self-contained unit',
    ],
    example: `export const usersFeature = createFeature({
  name: 'users',
  reducer: usersReducer
});

// Auto-generated — no manual createSelector needed:
export const {
  selectUsersState,
  selectUsers,
  selectLoading,
  selectError
} = usersFeature;

// Lazy route registration:
{
  path: 'users',
  loadComponent: () => UsersPageComponent,
  providers: [
    provideState(usersFeature),
    provideEffects(UsersEffects)
  ]
}`,
  },
  {
    title: 'Redux DevTools',
    tag: 'best-practice',
    orderIndex: 7,
    description:
      'The Redux DevTools browser extension gives you a complete audit trail of every action and state snapshot. You can pause, replay, and time-travel through the full state history — turning opaque bugs into obvious ones.',
    analogy:
      '🎥 A DVR for your app state: every action is a recording frame. You can rewind to any point, replay from there, and inspect exactly what changed between frames. No more guesswork with console.log — everything is visible.',
    keyPoints: [
      'Install the Redux DevTools Extension in Chrome or Firefox',
      'Add provideStoreDevtools({ maxAge: 25 }) to your app config',
      'Inspect every dispatched action and its payload in real time',
      'Compare before/after state diffs and replay sequences to reproduce bugs',
    ],
    example: `// app.config.ts
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ users: usersReducer }),
    provideEffects([UsersEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode() // disable in production
    })
  ]
};`,
  },
];

export const NGRX_QUIZZES_SEED: NgrxQuiz[] = [
  {
    question:
      'Spot the bug: the state appears to update but the UI never re-renders.',
    codeSnippet: `on(loadUsersSuccess, (state, { users }) => {
  state.users = users;     // assigning directly
  state.loading = false;
  return state;            // returning the same object
})`,
    options: [
      'on() does not support returning state directly',
      'Returning the same mutated object reference — NgRx uses reference equality to detect changes. The reference is identical so no subscriber is notified and the UI never updates',
      'state.users should be typed as ReadonlyArray to prevent this',
      'loadUsersSuccess should not carry a users prop',
    ],
    correctIndex: 1,
    explanation:
      "NgRx (like Angular's OnPush change detection) uses reference equality: if the new state === old state, it treats it as 'no change' and skips notification. Mutating and returning the same object means the reference never changes. Always return a brand-new object: { ...state, users, loading: false }.",
    orderIndex: 1,
  },
  {
    question:
      'Spot the bug: dispatching this effect causes an infinite action loop.',
    codeSnippet: `logSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUsersSuccess),
    tap(({ users }) => console.log('Loaded', users.length))
  )
);`,
    options: [
      'tap() cannot be used inside an Effect',
      'ofType must always accept multiple action types',
      "createEffect defaults to { dispatch: true } — it tries to re-dispatch the Observable's values (the original action objects from tap) back into the Store, creating an infinite loop",
      'The effect is missing a catchError and will crash on the first error',
    ],
    correctIndex: 2,
    explanation:
      'createEffect assumes the Observable emits Actions to dispatch by default. tap() passes the original action through unchanged — so loadUsersSuccess keeps getting dispatched over and over. Fix: pass { dispatch: false } as the second argument to createEffect() for effects that only perform side effects and should never dispatch anything.',
    orderIndex: 2,
  },
  {
    question:
      'Spot the bug: old search results occasionally overwrite newer ones.',
    codeSnippet: `search$ = createEffect(() =>
  this.actions$.pipe(
    ofType(searchUsers),
    mergeMap(({ query }) =>
      this.api.search(query).pipe(
        map(results => searchSuccess({ results })),
        catchError(err => of(searchFailure({ error: err.message })))
      )
    )
  )
);`,
    options: [
      "mergeMap fires all requests in parallel without cancelling previous ones — a slow response for 'an' can arrive after a faster response for 'angular', overwriting it with stale data. Use switchMap to cancel in-flight requests on each new action",
      'catchError must be placed outside the mergeMap to work correctly',
      'searchUsers action is missing a props<{ query: string }>() definition',
      'mergeMap is the correct operator here — this code is fine',
    ],
    correctIndex: 0,
    explanation:
      'mergeMap starts a new inner Observable for every emission and merges all results in arrival order. For a search box, a slow response to an early query can resolve after a faster later query — the UI shows stale data. switchMap cancels the previous in-flight HTTP request when a new action arrives, ensuring only the most recent response reaches the reducer.',
    orderIndex: 3,
  },
  {
    question:
      'Spot the bug: the selector never memoizes — it recomputes on every change-detection cycle.',
    codeSnippet: `export class UsersComponent {
  getActiveUsers() {
    return this.store.select(
      createSelector(selectAllUsers, users =>
        users.filter(u => u.active)
      )
    );
  }
}
// template: *ngFor="let u of getActiveUsers() | async"`,
    options: [
      'store.select() cannot accept createSelector() directly',
      "createSelector() inside a method creates a brand-new selector instance on every change-detection cycle, destroying memoization. The filter runs constantly even when users hasn't changed",
      '*ngFor requires a trackBy function when used with selector Observables',
      'getActiveUsers() must be marked async to work with the async pipe',
    ],
    correctIndex: 1,
    explanation:
      'Memoization relies on instance identity: a selector caches its last result and only recomputes when inputs change. Creating a new selector instance on every call means there is no cached result to compare against — it always recomputes from scratch. Fix: declare the selector at file or class level as a constant and call store.select(selectActiveUsers) once.',
    orderIndex: 4,
  },
  {
    question:
      'Spot the bug: after a failed HTTP request, the loading spinner never goes away.',
    codeSnippet: `export const usersReducer = createReducer(
  initialState,
  on(loadUsers, state =>
    ({ ...state, loading: true, error: null })
  ),
  on(loadUsersSuccess, (state, { users }) =>
    ({ ...state, loading: false, users })
  )
  // no handler for loadUsersFailure
);`,
    options: [
      'createReducer requires an explicit default case to compile',
      'The reducer has no on(loadUsersFailure) handler, so loading stays true forever after a failed request — the spinner spins indefinitely and the error is never surfaced',
      'Effects automatically reset loading: false on failure — no reducer handler needed',
      'This is fine — NgRx silently ignores unhandled actions and resets loading automatically',
    ],
    correctIndex: 1,
    explanation:
      "createReducer returns the current state untouched for any un-handled action \u2014 it doesn't crash. But this means loadUsersFailure arrives, no on() matches, state is unchanged, and loading stays true indefinitely. Always add on(myActionFailure, state => ({ ...state, loading: false, error })) for every action that sets loading: true.",
    orderIndex: 5,
  },
];
