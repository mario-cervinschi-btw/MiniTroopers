import { PracticeCategory } from './practices.types';

export const PRACTICES_SEED: PracticeCategory[] = [
  {
    slug: 'angular',
    title: 'Angular',
    description:
      'Architecture, rendering, routing, and Angular-specific patterns.',
    orderIndex: 1,
    items: [
      {
        title: 'Follow Angular style guide and feature structure',
        summary:
          'Keep naming and structure consistent with Angular conventions.',
        details:
          'Prefer feature-based organization, clear naming, and colocating related files. This reduces cognitive load and makes navigation predictable.',
        whyItMatters:
          'A consistent structure lowers onboarding time and avoids accidental coupling.',
        goodExample:
          'src/app/features/users/users-list.component.ts with matching html/scss/spec files.',
        badExample:
          'Putting unrelated components/services/helpers in a single shared folder.',
        tags: ['architecture', 'naming'],
        orderIndex: 1,
      },
      {
        title: 'Keep templates simple and move heavy logic to class/services',
        summary: 'Use templates for rendering, not business rules.',
        details:
          'Avoid chained ternaries, repeated calculations, and function-heavy bindings in templates. Use computed values in component class or dedicated services.',
        whyItMatters:
          'Improves readability, testability, and runtime performance.',
        goodExample:
          'Expose viewModel from component and bind with simple expressions.',
        badExample:
          'Complex loops, map/filter chains, and nested conditions directly in template.',
        tags: ['templates', 'readability'],
        orderIndex: 2,
      },
      {
        title: 'Use OnPush and immutable updates where possible',
        summary: 'Reduce unnecessary change detection work.',
        details:
          'Prefer immutable state updates and OnPush strategy for non-trivial components. Combine with Signals or push-based patterns for predictable updates.',
        whyItMatters:
          'Prevents accidental re-renders and keeps components scalable.',
        goodExample:
          'Create new arrays/objects when updating state and render via OnPush component.',
        badExample:
          'Mutating nested objects while using default change detection everywhere.',
        tags: ['performance', 'change-detection'],
        orderIndex: 3,
      },
      {
        title: 'Use routing features intentionally (lazy loading + guards)',
        summary: 'Design routes as boundaries for features and authorization.',
        details:
          'Lazy load larger features and apply CanActivate/CanDeactivate guards where needed. Keep guard logic focused and testable.',
        whyItMatters:
          'Improves startup performance and secures navigation flow.',
        goodExample:
          'Lazy route for admin feature with auth guard and unsaved-changes guard.',
        badExample:
          'Eagerly loading all routes and mixing authorization checks in every component.',
        tags: ['routing', 'security'],
        orderIndex: 4,
      },
      {
        title: 'Handle observables safely',
        summary: 'Use async pipe and controlled subscription lifecycles.',
        details:
          'Prefer async pipe in templates. In code, use finite streams or takeUntilDestroyed instead of manual subscription management in most cases.',
        whyItMatters: 'Avoids memory leaks and stale side effects.',
        goodExample: 'data$ bound with async pipe and auto-cleaned lifecycle.',
        badExample: 'Multiple manual subscriptions with missing teardown.',
        tags: ['rxjs', 'memory-leaks'],
        orderIndex: 5,
      },
      {
        title: 'Use trackBy in *ngFor for better rendering performance',
        summary: 'Help Angular identify which items changed in a list.',
        details:
          'Provide a trackBy function to *ngFor so Angular can reuse existing DOM nodes instead of re-rendering the entire list on every change.',
        whyItMatters:
          'Avoids unnecessary DOM destruction and recreation, especially in large or frequently updated lists.',
        goodExample:
          'trackByUserId(index: number, user: User) { return user.id; } used with *ngFor="let user of users; trackBy: trackByUserId".',
        badExample: '*ngFor without trackBy on a list that changes frequently.',
        tags: ['performance', 'templates'],
        orderIndex: 6,
      },
      {
        title: 'Avoid direct DOM manipulation',
        summary: 'Use Angular templates, directives, and Renderer2 instead.',
        details:
          'Do not access or mutate DOM elements directly via document.querySelector or ElementRef.nativeElement except as a last resort. Prefer template bindings, structural directives, and Angular CDK.',
        whyItMatters:
          'Direct DOM access bypasses Angular change detection and breaks server-side rendering compatibility.',
        goodExample:
          'Using [class.active]="isActive" or a directive instead of element.classList.add("active").',
        badExample:
          'document.getElementById("btn").style.display = "none" inside a component.',
        tags: ['templates', 'architecture'],
        orderIndex: 7,
      },
      {
        title: 'Use pipes for formatting data in templates',
        summary:
          'Keep formatting logic out of component classes and templates.',
        details:
          'Use built-in pipes (date, currency, async, titlecase) and create custom pipes for reusable display transformations. Pipes are pure by default and work well with OnPush.',
        whyItMatters:
          'Centralizes formatting, improves reuse, and keeps component logic focused on behavior.',
        goodExample:
          '{{ user.createdAt | date:"mediumDate" }} or a custom StatusLabelPipe.',
        badExample:
          'Formatting dates or labels with helper methods called directly in the template.',
        tags: ['templates', 'readability'],
        orderIndex: 8,
      },
      {
        title: 'Use interceptors for cross-cutting HTTP concerns',
        summary:
          'Centralize auth tokens, error handling, and logging in interceptors.',
        details:
          'HTTP interceptors are the correct place to attach authorization headers, handle global error responses, and log outgoing requests. Keep each interceptor focused on a single concern.',
        whyItMatters:
          'Avoids duplicating auth and error logic across every service call.',
        goodExample:
          'An AuthInterceptor that attaches the Bearer token and an ErrorInterceptor that maps 401 responses to a logout action.',
        badExample:
          'Manually adding Authorization headers in every service method.',
        tags: ['architecture', 'security'],
        orderIndex: 9,
      },
    ],
  },
  {
    slug: 'javascript',
    title: 'JavaScript and Security Basics',
    description:
      'Language essentials and common client/server security mistakes.',
    orderIndex: 2,
    items: [
      {
        title: 'Prefer const by default, let when reassignment is required',
        summary: 'Avoid var and understand hoisting behavior.',
        details:
          'Use const for values that should not be reassigned and let for mutable bindings. Avoid var due to function scope and hoisting confusion.',
        whyItMatters: 'Reduces accidental mutation and scope bugs.',
        goodExample: 'const apiUrl = ...; let retries = 0;',
        badExample: 'var i used across mixed scopes.',
        tags: ['language', 'basics'],
        orderIndex: 1,
      },
      {
        title: 'Use strict equality and understand reference vs value',
        summary: 'Make comparisons and mutations explicit.',
        details:
          'Prefer ===/!== and understand that objects/arrays are compared by reference, not by structure.',
        whyItMatters: 'Prevents hidden coercion bugs and state confusion.',
        goodExample: 'if (status === 200) { ... }',
        badExample: 'if (status == "200") { ... }',
        tags: ['language', 'correctness'],
        orderIndex: 2,
      },
      {
        title: 'Do not expose sensitive information',
        summary: 'Treat frontend as untrusted and keep secrets server-side.',
        details:
          'Do not store secrets in frontend code, logs, or URLs. Avoid returning excessive sensitive data in API responses. Prefer secure cookie strategies for tokens when possible.',
        whyItMatters: 'Protects users and reduces data leakage risks.',
        goodExample:
          'Backend validates authorization and returns minimal response payloads.',
        badExample: 'Hardcoded API keys and token dumps in console logs.',
        tags: ['security', 'api'],
        orderIndex: 3,
      },
      {
        title: 'Return safe error messages from APIs',
        summary: 'Hide internals while keeping errors actionable.',
        details:
          'Return user-safe errors with correlation IDs. Keep stack traces and low-level internals in server logs only.',
        whyItMatters:
          'Improves security posture while supporting troubleshooting.',
        goodExample: 'HTTP 500 with generic message and request id.',
        badExample: 'Exposing SQL/query stack traces to clients.',
        tags: ['security', 'error-handling'],
        orderIndex: 4,
      },
      {
        title: 'Sanitize user input and protect against XSS',
        summary: 'Never trust user-provided content rendered to the DOM.',
        details:
          'Angular sanitizes template bindings automatically, but direct use of innerHTML, bypassSecurityTrustHtml, or third-party rendering can introduce XSS. Always validate and sanitize input at the boundary. Avoid storing tokens in localStorage; prefer HttpOnly cookies.',
        whyItMatters:
          'XSS is one of the most common and impactful web vulnerabilities.',
        goodExample:
          'Using Angular template bindings and DomSanitizer only where strictly necessary with known-safe content.',
        badExample:
          'Setting element.innerHTML = userInput or calling bypassSecurityTrustHtml on untrusted data.',
        tags: ['security', 'xss'],
        orderIndex: 5,
      },
    ],
  },
  {
    slug: 'typescript',
    title: 'TypeScript',
    description: 'Type safety, readability, and maintainable type design.',
    orderIndex: 3,
    items: [
      {
        title: 'Enable strict mode and avoid any',
        summary: 'Use the compiler as a quality gate.',
        details:
          'Turn on strict mode and avoid any whenever possible. Prefer unknown for truly unknown values and narrow with type guards.',
        whyItMatters:
          'Catches defects early and improves refactoring confidence.',
        goodExample:
          'function parse(value: unknown): ParsedValue | null { ... }',
        badExample: 'function parse(value: any): any { ... }',
        tags: ['strictness', 'types'],
        orderIndex: 1,
      },
      {
        title: 'Model intent with precise types',
        summary: 'Use interfaces, unions, and utility types intentionally.',
        details:
          'Prefer interface for object contracts, literal unions for finite options, and utility types for transformations. Keep types focused.',
        whyItMatters: 'Improves expressiveness without overengineering.',
        goodExample: 'type Theme = "light" | "dark";',
        badExample: 'Large catch-all mega types used everywhere.',
        tags: ['design', 'maintainability'],
        orderIndex: 2,
      },
      {
        title: 'Declare explicit function return types in shared APIs',
        summary: 'Make contracts obvious at boundaries.',
        details:
          'In exported/shared functions, declare return types explicitly. Use inference for small local helpers where it remains clear.',
        whyItMatters: 'Prevents accidental API drift and improves readability.',
        goodExample: 'export function buildUser(id: string): User { ... }',
        badExample:
          'Exported functions with implicit and changing inferred returns.',
        tags: ['api-design', 'readability'],
        orderIndex: 3,
      },
      {
        title: 'Use readonly and avoid non-null assertions',
        summary: 'Enforce immutability and eliminate unsafe type overrides.',
        details:
          'Mark properties that should not change after initialization as readonly. Avoid the non-null assertion operator (!) — use optional chaining (?.) and nullish coalescing (??) to handle nullable values safely.',
        whyItMatters:
          'Prevents accidental mutation and hides potential null-reference errors that strict mode would otherwise catch.',
        goodExample:
          'readonly userId: string; and user?.profile?.name ?? "Guest".',
        badExample:
          'user!.profile.name where user could realistically be null.',
        tags: ['strictness', 'types'],
        orderIndex: 4,
      },
      {
        title: 'Use generics and utility types for reusable type-safe code',
        summary:
          'Avoid duplicating type logic with generics and built-in utility types.',
        details:
          'Write generic functions and classes when the logic is the same across multiple types. Use built-in utility types — Partial, Readonly, Pick, Omit, Required — for type transformations instead of duplicating interface definitions.',
        whyItMatters:
          'Reduces type duplication, improves maintainability, and keeps the type layer expressive.',
        goodExample:
          'function wrap<T>(value: T): { data: T } and Partial<UserForm> for optional form state.',
        badExample:
          'Duplicating interface definitions with slightly different required/optional fields instead of using Pick or Partial.',
        tags: ['design', 'maintainability'],
        orderIndex: 5,
      },
    ],
  },
  {
    slug: 'css-html',
    title: 'CSS and HTML',
    description:
      'Styling architecture, semantics, and accessibility fundamentals.',
    orderIndex: 4,
    items: [
      {
        title: 'Keep styles modular and reusable',
        summary:
          'Use SCSS, external stylesheets, meaningful names, and shared design tokens.',
        details:
          'Use SCSS as the CSS pre-processor: leverage SCSS variables ($color-primary) for design tokens and keep styles in dedicated .scss files. Use CSS custom properties for runtime-dynamic values. Favor BEM naming and break large stylesheets into smaller modular files. Avoid inline styles.',
        whyItMatters:
          'Makes styling predictable, scalable, and easier to evolve.',
        goodExample:
          '$spacing-md: 1rem; .card, .card__title, .card--featured with token-based spacing via SCSS variables.',
        badExample:
          'Inline styles, ad-hoc one-off class names, and raw hex values scattered across templates.',
        tags: ['css', 'scss', 'design-system'],
        orderIndex: 1,
      },
      {
        title: 'Choose responsive units intentionally',
        summary:
          'Match the CSS unit to the context: rem for scale, % for layout, px for precision, em for component-relative, vh/vw for viewport.',
        details:
          'Use rem for typography and spacing scales (relative to root font size). Use % for fluid container widths. Use px for borders and icon sizes that should not scale. Use em for padding on elements that must scale with their own font size (e.g. buttons). Use vh/vw for full-screen sections and viewport-relative layouts.',
        whyItMatters:
          'Improves accessibility, responsive behavior, and prevents layout breakage when users change browser font size.',
        goodExample:
          'font-size: 1rem; padding: 0.5em; width: 100%; height: 100vh; border: 1px solid;',
        badExample:
          'Hardcoding all spacing and typography with fixed px values regardless of context.',
        tags: ['css', 'responsive'],
        orderIndex: 2,
      },
      {
        title: 'Use semantic HTML and accessible structure',
        summary: 'Prefer meaningful elements and valid heading order.',
        details:
          'Use semantic elements for structure, maintain heading hierarchy, and avoid invalid nesting of block elements in inline elements.',
        whyItMatters: 'Supports assistive tech and improves document clarity.',
        goodExample: 'header/main/section with h1-h2-h3 progression.',
        badExample: 'Div soup and skipped heading levels.',
        tags: ['html', 'a11y'],
        orderIndex: 3,
      },
      {
        title: 'Use lint rules to enforce consistency',
        summary: 'Automate style and accessibility checks.',
        details:
          'Apply linting rules such as no-inline-styles, max-element-depth, require-input-label, and naming conventions.',
        whyItMatters: 'Keeps standards consistent as codebase grows.',
        goodExample: 'CI runs lint and fails on style regressions.',
        badExample: 'Relying on manual style review only.',
        tags: ['tooling', 'quality'],
        orderIndex: 4,
      },
      {
        title: 'Avoid CSS specificity pitfalls',
        summary: 'Do not use !important and keep selector nesting shallow.',
        details:
          'Avoid the !important declaration — it overrides all other rules and makes future changes difficult. Keep selector nesting to a maximum of 2–3 levels. Deeply nested selectors create fragile, hard-to-override styles and are a sign of poor structure.',
        whyItMatters:
          'High specificity and !important make stylesheets brittle and exponentially harder to maintain as the codebase grows.',
        goodExample:
          '.card__title { } — flat, low-specificity BEM selector with no !important.',
        badExample:
          '.page .section .card .header .title { color: red !important; }',
        tags: ['css', 'maintainability'],
        orderIndex: 5,
      },
    ],
  },
];
