export type Wallet = {
    _id: string;
    createdAt: string;
    balance: number;
    user: string;
}

export type UserWithWallet = User & {
    wallet: Wallet
}

export type UserMini = {
    _id: string;
    createdAt: string;
    email: string;
    userName: string;
    isVerified?: boolean; // true only if email has been verified
}

export type User = UserMini & {
    firstName: string;
    lastName: string;
    phone: string;
    image: string;
}