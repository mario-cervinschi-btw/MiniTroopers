import { User } from '../../models/user.model';

export interface AuthState {
  currentUser: User | null;
  loadingCurrentUser: boolean;
  loadingUpdateCurrentUser: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  currentUser: null,
  loadingCurrentUser: false,
  loadingUpdateCurrentUser: false,
  error: null,
};
