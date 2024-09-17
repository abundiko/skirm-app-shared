import { League, dummyLeagues } from "./league";

export type Club = {
  _id: string;
  createdAt: string;
  name: string;
  logo: string;
  country: string;
  state: string;
  primaryColor: string;
  homeLeague: string;
};

export type ClubDetailed = Omit<Club, 'homeLeague'> & {
  homeLeague: League;
}

export const dummyClubs: Club[] = [
  {
    _id: "club001",
    createdAt: "2023-01-01T00:00:00Z",
    name: "Manchester United",
    logo: "https://example.com/man_utd_logo.png",
    country: "England",
    state: "Manchester",
    primaryColor: "#DA291C",
    homeLeague: "league001"
  },
  {
    _id: "club002",
    createdAt: "2023-01-02T00:00:00Z",
    name: "Barcelona",
    logo: "https://example.com/barcelona_logo.png",
    country: "Spain",
    state: "Catalonia",
    primaryColor: "#A50044",
    homeLeague: "league002"
  },
  {
    _id: "club003",
    createdAt: "2023-01-03T00:00:00Z",
    name: "Bayern Munich",
    logo: "https://example.com/bayern_munich_logo.png",
    country: "Germany",
    state: "Bavaria",
    primaryColor: "#DC052D",
    homeLeague: "league003"
  },
  {
    _id: "club004",
    createdAt: "2023-01-04T00:00:00Z",
    name: "Juventus",
    logo: "https://example.com/juventus_logo.png",
    country: "Italy",
    state: "Turin",
    primaryColor: "#000000",
    homeLeague: "league004"
  },
  {
    _id: "club005",
    createdAt: "2023-01-05T00:00:00Z",
    name: "Paris Saint-Germain",
    logo: "https://example.com/psg_logo.png",
    country: "France",
    state: "Paris",
    primaryColor: "#004170",
    homeLeague: "league005"
  },
  {
    _id: "club006",
    createdAt: "2023-01-06T00:00:00Z",
    name: "Liverpool",
    logo: "https://example.com/liverpool_logo.png",
    country: "England",
    state: "Liverpool",
    primaryColor: "#C8102E",
    homeLeague: "league001"
  }
];

export const dummyClubsDetailed: ClubDetailed[] = dummyClubs.map((club, i) => {
  const { homeLeague, ...others } = club;
  return {
    ...others,
    homeLeague: dummyLeagues[i] ?? dummyLeagues[0]
  }
})