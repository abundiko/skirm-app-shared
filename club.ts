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
    "name": "Arsenal",
    "logo": "https://1000logos.net/wp-content/uploads/2016/10/Arsenal-Logo.png",
    "primaryColor": "#EF0107",
    "country": "England",
    "state": "London",
    homeLeague: "league001"
  },
  {
    _id: "club002",
    createdAt: "2023-01-02T00:00:00Z",
    "name": "Bayern Munich",
    "logo": "https://1000logos.net/wp-content/uploads/2018/05/Bayern-M%C3%BCnchen-Logo.png",
    "country": "Germany",

    "state": "Bavaria",
    "primaryColor": "#DC052D",
    homeLeague: "league002"
  },
  {
    _id: "club003",
    createdAt: "2023-01-03T00:00:00Z",
    "name": "Barcelona",
    "logo": "https://1000logos.net/wp-content/uploads/2016/10/Barcelona-Logo.png",
    "country": "Spain",

    "state": "Catalonia",
    "primaryColor": "#004D98",
    homeLeague: "league003"
  },
  {
    _id: "club004",
    createdAt: "2023-01-04T00:00:00Z",
  "name": "Real Madrid",
    "logo": "https://1000logos.net/wp-content/uploads/2020/09/Real-Madrid-logo.png",
    "country": "Spain",

    "state": "Madrid",
    "primaryColor": "#FFFFFF",
    homeLeague: "league004"
  },
  {
    _id: "club005",
    createdAt: "2023-01-05T00:00:00Z",
   "name": "Juventus",
    "logo": "https://1000logos.net/wp-content/uploads/2021/05/Juventus-logo.png",
    "country": "Italy",

    "state": "Turin",
    "primaryColor": "#000000",
    homeLeague: "league005"
  },
  {
    _id: "club006",
    createdAt: "2023-01-06T00:00:00Z",
    "name": "AC Milan",
    "logo": "https://1000logos.net/wp-content/uploads/2016/10/AC-Milan-Logo.png",
    "country": "Italy",

    "state": "Milan",
    "primaryColor": "#FB090B",
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