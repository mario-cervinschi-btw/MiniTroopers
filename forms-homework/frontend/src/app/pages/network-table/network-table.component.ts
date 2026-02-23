import { Component, inject } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import {MatTableModule} from '@angular/material/table';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-network-table',
  imports: [WrapperComponent, MatTableModule, AvatarComponent],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
})
export class NetworkTableComponent {
  protected readonly userService: UsersService = inject(UsersService);
  protected readonly displayedColumns: string[] = ['name', 'headline', 'location', 'connections'];
  protected usersAvailable: User[] = [];

  ngOnInit() {
    this.userService.allUsers().subscribe((next) => {
      this.usersAvailable = next;
    })
  }
}
