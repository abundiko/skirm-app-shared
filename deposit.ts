import { User } from "./user";

export type Deposit = {
    _id: string;
    createdAt: string;
    user: string;
    amount: number;
    isApproved: boolean;
    approvedAt?: string;
    uid?: string; // may be session id from the payment gateway
}

export type DepositDetailed = Omit<Deposit, 'user'> & {
    user: User;
}