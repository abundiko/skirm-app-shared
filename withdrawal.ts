import { User, dummyUsers } from "./user";

export type WithdrawalStatus = "pending" | "approved" | "declined"

export type Withdrawal = {
    _id: string;
    createdAt: string;
    user: string;
    amount: number;
    bankName: string;
    bankAccountNumber: string;
    bankAccountName: string;
    status: WithdrawalStatus;
    approvedAt?: string;
    message?: string; // if declined, example "the account details you provided were invalid, please cross-check and request another withdrawal"
}

export type WithdrawalDetailed = Omit<Withdrawal, 'user'> & {
    user: User;
}

export const dummyWithdrawals: Withdrawal[] = [
    {
        _id: "1",
        createdAt: "2023-01-01T10:00:00Z",
        user: "user1",
        amount: 4000,
        bankName: "Bank A",
        bankAccountNumber: "1234567890",
        bankAccountName: "John Doe",
        status: "pending",
        approvedAt: undefined,
        message: undefined,
    },
    {
        _id: "2",
        createdAt: "2023-01-02T11:00:00Z",
        user: "user2",
        amount: 4000,
        bankName: "Bank B",
        bankAccountNumber: "0987654321",
        bankAccountName: "Jane Smith",
        status: "approved",
        approvedAt: "2023-01-02T12:00:00Z",
        message: undefined,
    },
    {
        _id: "3",
        createdAt: "2023-01-03T09:30:00Z",
        user: "user3",
        amount: 4000,
        bankName: "Bank C",
        bankAccountNumber: "1122334455",
        bankAccountName: "Alice Johnson",
        status: "declined",
        approvedAt: undefined,
        message: "the account details you provided were invalid, please cross-check and request another withdrawal",
    },
    {
        _id: "4",
        createdAt: "2023-01-04T14:45:00Z",
        user: "user4",
        amount: 4000,
        bankName: "Bank D",
        bankAccountNumber: "5566778899",
        bankAccountName: "Bob Brown",
        status: "pending",
        approvedAt: undefined,
        message: undefined,
    },
    {
        _id: "5",
        createdAt: "2023-01-05T08:15:00Z",
        user: "user5",
        amount: 4000,
        bankName: "Bank E",
        bankAccountNumber: "2233445566",
        bankAccountName: "Charlie Davis",
        status: "approved",
        approvedAt: "2023-01-05T09:00:00Z",
        message: undefined,
    },
    {
        _id: "6",
        createdAt: "2023-01-06T16:30:00Z",
        user: "user6",
        amount: 4000,
        bankName: "Bank F",
        bankAccountNumber: "6677889900",
        bankAccountName: "Diana Evans",
        status: "declined",
        approvedAt: undefined,
        message: "the account details you provided were invalid, please cross-check and request another withdrawal",
    },
];

export const dummyWithdrawalsDetailed: WithdrawalDetailed[] = dummyWithdrawals.map((item, i) => ({
    ...item,
    user: dummyUsers[i] ?? dummyUsers[0]
}))
