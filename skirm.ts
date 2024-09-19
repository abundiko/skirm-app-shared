import { Match, MatchDetailed, dummyMatches, dummyMatchesDetailed } from "./match";
import { Notion, dummyNotions } from "./notion";
import { User, dummyUsers } from "./user";

export type Skirm = {
    _id: string;
    createdAt: string;
    completedAt?: string;
    stake: number;
    owner: string;
    guest: string;
    match: string;
    ownerNotion: string;
    guestNotion: string;
    winner?: string;
}

export type SkirmDetailed = Omit<Skirm,
    'owner' | 'guest' | 'match' | 'ownerNotion' | 'guestNotion' | 'winner'> & {
        owner: User;
        guest: User;
        match: MatchDetailed;
        ownerNotion: Notion;
        guestNotion: Notion;
        winner?: User; // only available when match [endDateTime] has reached and notions match
    }

export const dummySkirms: Skirm[] = [
    {
        _id: "1",
        createdAt: "2023-01-01T00:00:00Z",
        completedAt: "2023-01-02T00:00:00Z",
        stake: 100,
        owner: "user1",
        guest: "user2",
        match: "match1",
        ownerNotion: "notion1",
        guestNotion: "notion2",
        winner: "user1"
    },
    {
        _id: "2",
        createdAt: "2023-01-03T00:00:00Z",
        completedAt: "2023-01-04T00:00:00Z",
        stake: 200,
        owner: "user3",
        guest: "user4",
        match: "match2",
        ownerNotion: "notion3",
        guestNotion: "notion4",
        winner: "user4"
    },
    {
        _id: "3",
        createdAt: "2023-01-05T00:00:00Z",
        completedAt: "2023-01-06T00:00:00Z",
        stake: 150,
        owner: "user5",
        guest: "user6",
        match: "match3",
        ownerNotion: "notion5",
        guestNotion: "notion6",
        winner: "user5"
    },
    {
        _id: "4",
        createdAt: "2023-01-07T00:00:00Z",
        completedAt: "2023-01-08T00:00:00Z",
        stake: 250,
        owner: "user7",
        guest: "user8",
        match: "match4",
        ownerNotion: "notion7",
        guestNotion: "notion8",
        winner: "user8"
    },
    {
        _id: "5",
        createdAt: "2023-01-09T00:00:00Z",
        completedAt: "2023-01-10T00:00:00Z",
        stake: 300,
        owner: "user9",
        guest: "user10",
        match: "match5",
        ownerNotion: "notion9",
        guestNotion: "notion10",
        winner: "user9"
    }
];

export const dummySkirmsDetailes: SkirmDetailed[] = dummySkirms.map((skirm, i) => {
    const { owner, guest, match, ownerNotion, guestNotion, ...others } = skirm;
    return {
        ...others,
        owner: dummyUsers[i] ?? dummyUsers[0],
        guest: dummyUsers[i + 1] ?? dummyUsers[0],
        match: dummyMatchesDetailed[i] ?? dummyMatchesDetailed[0],
        ownerNotion: dummyNotions[i] ?? dummyNotions[0],
        guestNotion: dummyNotions[i + 1] ?? dummyNotions[0],

    } as SkirmDetailed;
})