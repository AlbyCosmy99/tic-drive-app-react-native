export default interface User {
    name: string;
    surname: string;
    email: string;
    category: UserCategory
}

export type UserCategory = "user" | "workshop"