import { Club } from '../club';
import { FixtureMatch, FixtureTeams } from '../fixture';
import { League } from '../league';
import { MatchDetailed } from '../match';
import { SkirmDetailed, SkirmParticipant } from '../skirm';
import { NotionObject } from './NotionObject';

export function fixtureLeagueToLeague(fixture: FixtureMatch): League {
  return {
    _id: fixture.league.id.toString(),
    createdAt: fixture.league.season.toString(),
    logo: fixture.league.logo,
    endDate: '',
    startDate: '',
    title: fixture.league.name,
  };
}

export function fixtureTeamToClub(fixture: FixtureMatch, homeOrAway: keyof FixtureTeams): Club {
  return {
    _id: fixture.teams[homeOrAway].id.toString(),
    createdAt: '',
    logo: fixture.teams[homeOrAway].logo,
    name: fixture.teams[homeOrAway].name,
    country: '',
    homeLeague: fixture.league.name,
    primaryColor: '',
    shortName: '',
    state: '',
  };
}

export function fixtureToMatchDetailed(fixture: FixtureMatch): MatchDetailed {
  return {
    _id: fixture._id,
    league: fixtureLeagueToLeague(fixture),
    homeTeam: fixtureTeamToClub(fixture, 'home'),
    awayTeam: fixtureTeamToClub(fixture, 'away'),
    homeScore: fixture.goals.home ?? undefined,
    awayScore: fixture.goals.away ?? undefined,
    startDateTime: fixture.fixture.date,
    endDateTime: '',
    isCompleted: fixture.fixture.status.short === 'FT',
    isOverTime: fixture.fixture.status.short === 'AET',
    isDraw: fixture.goals.home === fixture.goals.away,
    notions: fixture.notions,
    createdAt: fixture.createdAt,
  };
}

export function getAllSkirmParticipants(skirm: SkirmDetailed): SkirmParticipant[] {
  return [
    {
      user_id: skirm.creator.user_id,
      notion: skirm.creator.notion,
      joinedAt: skirm.createdAt,
    },
    ...(skirm.guests ?? []),
  ]
    .map((person) => ({
      ...person,
      // notion: new NotionObject(person.notion).toReadableWithTeams(
      //   skirm.fixture_id.teams.home.name,
      //   skirm.fixture_id.teams.away.name
      // ),
      notion: person.notion,
    }))
    .filter((i) => typeof i !== 'undefined');
}

export const SharedUtils = {
  fixtureLeagueToLeague,
  fixtureTeamToClub,
  fixtureToMatchDetailed,
};
