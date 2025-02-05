import { FixtureMatch, dummyFixtures } from './fixture';
import { dummmyNotionStrings } from './notion';
import { User, dummyUsers } from './user';

export type SkirmStatus = 'open' | 'closed' | 'completed';

export type Skirm = {
  _id: string;
  createdAt: string;
  completedAt?: string;
  amount: number;
  creator: string;
  fixture_id: string | null;
  guests: SkirmParticipant[] | null;
  guestLimit: number;
  status?: SkirmStatus;
  isPrivate?: boolean;
};

export type SkirmParticipant = {
  user_id: User;
  notion: string;
  joinedAt: string;
};

export type SkirmDetailed = Omit<Skirm, "creator" | 'fixture_id'> & {
  creator: SkirmParticipant;
  fixture_id: FixtureMatch | null;
};

export const dummySkirmGuests: SkirmParticipant[] = [
  {
    user_id: dummyUsers[0],
    notion: dummmyNotionStrings[0],
    joinedAt: '2023-01-01T00:00:00Z',
  },
  {
    user_id: dummyUsers[1],
    notion: dummmyNotionStrings[1],
    joinedAt: '2023-01-02T00:00:00Z',
  },
  {
    user_id: dummyUsers[2],
    notion: dummmyNotionStrings[2],
    joinedAt: '2023-01-03T00:00:00Z',
  },
  {
    user_id: dummyUsers[3],
    notion: dummmyNotionStrings[3],
    joinedAt: '2023-01-04T00:00:00Z',
  },
];

export const dummySkirms: Skirm[] = [
  {
    _id: '1',
    createdAt: '2023-01-01T00:00:00Z',
    completedAt: '2023-01-02T00:00:00Z',
    amount: 100,
    creator: 'user1',
    guests: dummySkirmGuests,
    fixture_id: dummyFixtures[0]._id,
    guestLimit: 1,
  },
  {
    _id: '2',
    createdAt: '2023-01-03T00:00:00Z',
    completedAt: '2023-01-04T00:00:00Z',
    amount: 200,
    creator: 'user3',
    guests: dummySkirmGuests,
    fixture_id: dummyFixtures[1]._id,
    guestLimit: 3,
  },
  {
    _id: '3',
    createdAt: '2023-01-05T00:00:00Z',
    completedAt: '2023-01-06T00:00:00Z',
    amount: 150,
    creator: 'user5',
    guests: dummySkirmGuests,
    fixture_id: dummyFixtures[2]._id,
    guestLimit: 1,
  },
  {
    _id: '4',
    createdAt: '2023-01-07T00:00:00Z',
    completedAt: '2023-01-08T00:00:00Z',
    amount: 250,
    creator: 'user7',
    guests: dummySkirmGuests,
    fixture_id: dummyFixtures[3]._id,
    guestLimit: 5,
  },
  {
    _id: '5',
    createdAt: '2023-01-09T00:00:00Z',
    completedAt: '2023-01-10T00:00:00Z',
    amount: 300,
    creator: 'user9',
    guests: dummySkirmGuests,
    fixture_id: dummyFixtures[4]._id,
    guestLimit: 1,
  },
];

export const dummySkirmsDetailes: SkirmDetailed[] = dummySkirms.map((skirm, i) => {
  const { creator: owner, ...others } = skirm;
  return {
    ...others,
    creator: dummySkirmGuests[i] ?? dummySkirmGuests[0],
    fixture_id: dummyFixtures[i] ?? null,
  } as SkirmDetailed;
});
