export default interface User {
    name: string | undefined;
    email: string;
    category: UserCategory
}

export type UserCategory = "user" | "workshop"