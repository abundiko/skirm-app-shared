import { League } from "./league";

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