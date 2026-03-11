import {
  DestroyRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UsersService } from '../services/users.service';
import { finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appIfCurrentUser]',
})
export class IfCurrentUserDirective {
  private readonly destroyRef = inject(DestroyRef);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly userService = inject(UsersService);
  private readonly router = inject(Router);

  private currentUserId!: number;

  @Input() set appIfCurrentUser(id: number) {
    this.setLoading.emit(true);
    this.viewContainerRef.clear();
    this.userService
      .currentUser()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((val) => {
          this.currentUserId = val.id;

          if (id == this.currentUserId) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          } else {
            this.router.navigate(['/']);
          }
        }),
        finalize(() => {
          this.setLoading.emit(false);
        }),
      )
      .subscribe();
  }

  @Output() setLoading = new EventEmitter<boolean>();
}
