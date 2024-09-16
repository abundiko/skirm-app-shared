export type Admin = {
    _id: string;
    createdAt: string;
    email: string;
    userName: string;
}

export type AdminAuthResponse = {
    admin: Admin;
    token: string;
}