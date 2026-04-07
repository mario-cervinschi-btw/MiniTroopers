import { User } from '../../models/user.model';

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isInitAuth: boolean;
  loadingCurrentUser: boolean;
  loadingUpdateCurrentUser: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  isInitAuth: false,
  loadingCurrentUser: false,
  loadingUpdateCurrentUser: false,
  error: null,
};
