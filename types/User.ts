export default interface User {
  name: string | undefined;
  email: string;
  category: UserCategory;
  password?: string;
  repeatedPassword?: string;
}

export type UserCategory = 'user' | 'workshop';
