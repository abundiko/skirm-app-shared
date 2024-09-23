import { Skirm } from "./skirm";
import { User } from "./user";

export type UserNotificationCategory = "message" | "win" | "loss" | "security"

export type UserNotification = {
    _id: string;
    createdAt: string;
    user: string;
    category: UserNotificationCategory;
    skirm?: string;
    message: string;
    body: string;
}

export type UserNotificationDetailed = Omit<UserNotification, "skirm" | "user"> & {
    user: User;
    skirm: Skirm;
}

export const USER_NOTIFICATION_OPTIONS: {
    title: string;
    value: "" | UserNotificationCategory,
}[] = [
        { title: "All Categories", value: "" },
        { title: "Messages", value: "message" },
        { title: "Winnings", value: "win" },
        { title: "Loses", value: "loss" },
    ]

export const dummyUserNotifications: UserNotification[] = [
    {
        _id: "1",
        createdAt: new Date().toISOString(),
        user: "user1",
        category: "message",
        skirm: "skirm1",
        message: "You have a new message from your coach.",
        body: "Don't forget to check your messages for important updates."
    },
    {
        _id: "2",
        createdAt: new Date().toISOString(),
        user: "user2",
        category: "win",
        skirm: "skirm2",
        message: "Congratulations!",
        body: "Your team has won the latest skirmish. Great job!"
    },
    {
        _id: "3",
        createdAt: new Date().toISOString(),
        user: "user3",
        category: "loss",
        skirm: "skirm3",
        message: "Tough loss.",
        body: "Your team lost the recent skirmish. Keep practicing!"
    },
    {
        _id: "4",
        createdAt: new Date().toISOString(),
        user: "user4",
        category: "security",
        skirm: "skirm4",
        message: "Security Alert!",
        body: "There was a login attempt from an unrecognized device."
    },
    {
        _id: "5",
        createdAt: new Date().toISOString(),
        user: "user5",
        category: "message",
        skirm: "skirm5",
        message: "New event scheduled.",
        body: "A new skirmish event has been scheduled. Check the calendar for details."
    }
];
