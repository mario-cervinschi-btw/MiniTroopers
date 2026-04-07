import { DestroyRef, Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthFacade } from '../store/auth/auth.facade';

@Directive({
  selector: '[appIfCurrentUser]',
})
export class IfCurrentUserDirective {
  private readonly destroyRef = inject(DestroyRef);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly authFacade = inject(AuthFacade);

  private readonly router = inject(Router);

  private currentUserId?: number;

  @Input() set appIfCurrentUser(id: number) {
    this.authFacade.currentUser$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((val) => {
          this.currentUserId = val?.id;
          this.viewContainerRef.clear();

          if (id == this.currentUserId) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          } else {
            this.router.navigate(['/']);
          }
        }),
      )
      .subscribe();
  }
}
