import {
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UsersService } from '../services/users.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Directive({
  selector: '[appIfCurrentUser]',
})
export class IfCurrentUserDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private userService = inject(UsersService);

  private router = inject(Router);

  private currentUserId!: number;

  @Input() set appIfCurrentUser(id: number) {
    this.viewContainerRef.clear();
    this.userService
      .currentUser()
      .pipe(
        tap((val) => {
          this.currentUserId = val.id;

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
