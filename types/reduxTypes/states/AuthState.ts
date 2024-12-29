import User from '../../User';

export default interface AuthState {
  user: User | null;
  token?: string | null;
}
