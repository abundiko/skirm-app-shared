import { User, dummyUsers } from "./user";

export type Deposit = {
    _id: string;
    createdAt: string;
    user: string;
    amount: number;
    balanceBeforeDeposit?: number;
    uid?: string; // may be session id from the payment gateway
}

export type DepositDetailed = Omit<Deposit, 'user'> & {
    user: User;
}

export const dummyDeposits: Deposit[] = [
    {
        _id: "1",
        createdAt: "2023-01-01T10:00:00Z",
        user: "user1",
        amount: 5000,
        balanceBeforeDeposit: 10000,
        uid: "session1"
    },
    {
        _id: "2",
        createdAt: "2023-01-02T11:00:00Z",
        user: "user2",
        amount: 3000,
        balanceBeforeDeposit: 7000,
        uid: "session2"
    },
    {
        _id: "3",
        createdAt: "2023-01-03T09:30:00Z",
        user: "user3",
        amount: 1500,
        balanceBeforeDeposit: 5000,
        uid: "session3"
    },
    {
        _id: "4",
        createdAt: "2023-01-04T14:45:00Z",
        user: "user4",
        amount: 2500,
        balanceBeforeDeposit: 3000,
        uid: "session4"
    },
    {
        _id: "5",
        createdAt: "2023-01-05T08:15:00Z",
        user: "user5",
        amount: 4000,
        balanceBeforeDeposit: 6000,
        uid: "session5"
    },
    {
        _id: "6",
        createdAt: "2023-01-06T16:30:00Z",
        user: "user6",
        amount: 3500,
        balanceBeforeDeposit: 8000,
        uid: "session6"
    },
];

export const dummyDepositsDetailed: DepositDetailed[] = dummyDeposits.map((item, i) => ({
    ...item,
    user: dummyUsers[i] ?? dummyUsers[0]
}))