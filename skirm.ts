import { Match } from "./match";
import { Notion } from "./notion";
import { User } from "./user";

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
        match: Match;
        ownerNotion: Notion;
        guestNotion: Notion;
        winner?: User; // only available when match [endDateTime] has reached and notions match
    }