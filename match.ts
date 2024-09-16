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
}

export type MatchDetailed = Omit<Match, 'homeTeam' | 'awayTeam' | 'league'> & {
    homeTeam: Club;
    awayTeam: Club;
    league: League;
}