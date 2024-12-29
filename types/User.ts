export default interface User {
  userId: string;
  name: string | undefined;
  email: string;
  category: UserCategory;
  emailConfirmed: boolean;
  password?: string;
  repeatedPassword?: string;
}

export type UserCategory = 'user' | 'workshop';
