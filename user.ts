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

export const dummyUsers: User[] = [
    {
        _id: "user001",
        createdAt: "2023-01-01T00:00:00Z",
        email: "john.doe@example.com",
        userName: "johndoe",
        isVerified: true,
        firstName: "John",
        lastName: "Doe",
        phone: "+1234567890",
        image: "https://example.com/john_doe.jpg"
    },
    {
        _id: "user002",
        createdAt: "2023-01-02T00:00:00Z",
        email: "jane.smith@example.com",
        userName: "janesmith",
        isVerified: true,
        firstName: "Jane",
        lastName: "Smith",
        phone: "+1987654321",
        image: "https://example.com/jane_smith.jpg"
    },
    {
        _id: "user003",
        createdAt: "2023-01-03T00:00:00Z",
        email: "mike.johnson@example.com",
        userName: "mikejohnson",
        isVerified: false,
        firstName: "Mike",
        lastName: "Johnson",
        phone: "+1122334455",
        image: "https://example.com/mike_johnson.jpg"
    },
    {
        _id: "user004",
        createdAt: "2023-01-04T00:00:00Z",
        email: "emily.brown@example.com",
        userName: "emilybrown",
        isVerified: true,
        firstName: "Emily",
        lastName: "Brown",
        phone: "+1555666777",
        image: "https://example.com/emily_brown.jpg"
    }
];
