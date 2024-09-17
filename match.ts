import { Club, dummyClubs } from "./club"
import { League, dummyLeagues } from "./league";

export type Match = {
    _id: string;
    createdAt: string;
    homeTeam: string;
    awayTeam: string;
    startDateTime: string;
    endDateTime: string;
    league: string;
    isCompleted: boolean; // true when the match is completed and played
    // optional: only available after match was over
    homeScore?: number;
    awayScore?: number;
    isOverTime?: boolean;
    isDraw?: boolean;
}

export type MatchCompleted = Omit<Match, 'homeScore' | 'awayScore' | 'isOverTime' | 'isDraw' | 'isCompleted'> & {
    isCompleted: true; // true when the match is completed and played
    homeScore: number;
    awayScore: number;
    isOverTime: boolean;
    isDraw: boolean;
}

export type MatchDetailed = Omit<Match, 'homeTeam' | 'awayTeam' | 'league'> & {
    homeTeam: Club;
    awayTeam: Club;
    league: League;
}

export const dummyMatches: Match[] = [
    {
        _id: "match001",
        createdAt: "2023-06-01T10:00:00Z",
        homeTeam: "club001",
        awayTeam: "club002",
        startDateTime: "2023-06-15T19:00:00Z",
        endDateTime: "2023-06-15T21:00:00Z",
        league: "league001",
        isCompleted: false
    },
    {
        _id: "match002",
        createdAt: "2023-06-02T11:30:00Z",
        homeTeam: "club003",
        awayTeam: "club004",
        startDateTime: "2023-06-16T20:00:00Z",
        endDateTime: "2023-06-16T22:00:00Z",
        league: "league002",
        isCompleted: true,
        homeScore: 2,
        awayScore: 1,
        isOverTime: false,
        isDraw: false
    },
    {
        _id: "match003",
        createdAt: "2023-06-03T09:45:00Z",
        homeTeam: "club005",
        awayTeam: "club006",
        startDateTime: "2023-06-17T18:30:00Z",
        endDateTime: "2023-06-17T20:30:00Z",
        league: "league003",
        isCompleted: false
    },
    {
        _id: "match004",
        createdAt: "2023-06-04T14:15:00Z",
        homeTeam: "club001",
        awayTeam: "club003",
        startDateTime: "2023-06-18T15:00:00Z",
        endDateTime: "2023-06-18T17:00:00Z",
        league: "league001",
        isCompleted: true,
        homeScore: 1,
        awayScore: 1,
        isOverTime: true,
        isDraw: true
    }
];


export const dummyMatchesDetailed: MatchDetailed[] = dummyMatches.map((match, i) => {
    const { homeTeam, awayTeam, league, ...others } = match;
    return {
        ...others,
        homeTeam: dummyClubs[i] ?? dummyClubs[0],
        awayTeam: dummyClubs[i+3] ?? dummyClubs[0+i],
        league: dummyLeagues[i] ?? dummyLeagues[0],
    }
});
