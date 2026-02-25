import { Component, inject } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../shared/services/users.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { map } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

interface TableUser {
  id: number;
  firstName: string;
  lastName: string;
  location: string;
  connections: number;
  headline: string;
}

@Component({
  selector: 'app-network-table',
  imports: [WrapperComponent, MatTableModule, AvatarComponent, RouterModule],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
})
export class NetworkTableComponent {
  private readonly router: Router = inject(Router);

  protected readonly userService: UsersService = inject(UsersService);
  protected readonly displayedColumns: string[] = ['name', 'headline', 'location', 'connections'];
  protected usersAvailable: TableUser[] = [];

  ngOnInit() {
    this.userService
      .allUsers()
      .pipe(
        map((users) =>
          users.map((u) => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            location: u.location,
            connections: u.connections,
            headline: u.headline,
          })),
        ),
      )
      .subscribe((next) => {
        this.usersAvailable = next;
      });
  }

  onRowClick(row: TableUser): void {
    this.router.navigate(['/profile', row.id]);
  }
}
