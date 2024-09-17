export type TransactionHistoryType = 'credit' | 'withdrawal' | 'stake'

export type TransactionHistory = {
    _id: string;
    createdAt: string;
    type: TransactionHistoryType,
    amount: number;
}

export const TRANSACTION_HISTORY_OPTIONS: {
    title: string;
    value: "" | TransactionHistoryType,
}[] = [
        { title: "All", value: "" },
        { title: "Withdrawal", value: "withdrawal" },
        { title: "Credit", value: "credit" },
        { title: "Stake", value: "stake" },
    ]

export const dummyTransactions: TransactionHistory[] = [
    {
        _id: '1',
        createdAt: '2023-06-01T10:30:00Z',
        type: 'credit',
        amount: 5000
    },
    {
        _id: '2',
        createdAt: '2023-06-02T14:45:00Z',
        type: 'withdrawal',
        amount: 2000
    },
    {
        _id: '3',
        createdAt: '2023-06-03T09:15:00Z',
        type: 'stake',
        amount: 1000
    },
    {
        _id: '4',
        createdAt: '2023-06-04T16:20:00Z',
        type: 'credit',
        amount: 3000
    },
    {
        _id: '5',
        createdAt: '2023-06-05T11:00:00Z',
        type: 'withdrawal',
        amount: 1500
    }
];
