export type UserMini = {
    _id: string;
    createdAt: string;
    email: string;
    userName: string;
}

export type User = UserMini & {
    firstName: string;
    lastName: string;
    phone: string;
    image: string;
}