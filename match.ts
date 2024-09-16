import { Club } from "./club"
import { League } from "./league";

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

export type MatchCompleted = Omit<Match, 'homeScore'|'awayScore'|'isOverTime'|'isDraw'|'isCompleted'> & {
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