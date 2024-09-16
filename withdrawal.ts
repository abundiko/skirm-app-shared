import { User } from "./user";

export type Withdrawal = {
    _id: string;
    createdAt: string;
    user: string;
    bankName: string;
    bankAccountNumber: string;
    bankAccountName: string;
    isApproved: string;
    approvedAt?: string;
}

export type WithdrawalDetailed = Omit<Withdrawal, 'user'> & {
    user: User;
}