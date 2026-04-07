import { PaginatedResponse } from '../../models/pagination.model';
import { TablePreferences } from '../../models/table-preferences.model';
import { User } from '../../models/user.model';

export interface UserTableState {
  users: PaginatedResponse<User> | null;
  userTablePreferences: TablePreferences | null;
  loadingTablePreferences: boolean;
  loadingUsers: boolean;
  error: string | null;
}

export const initialTableState: UserTableState = {
  users: null,
  userTablePreferences: null,
  loadingTablePreferences: false,
  loadingUsers: false,
  error: null,
};
