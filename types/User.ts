export default interface User {
  userId?: string;
  name: string | undefined;
  email: string;
  category: UserCategory;
  emailConfirmed?: boolean;
  password?: string;
  repeatedPassword?: string;
  imageurl?: string;
  phoneNumber?: string;
  address?: string;
}

export type UserCategory = 'user' | 'workshop';
