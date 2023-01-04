import {SearchEventType} from "./enum";

export interface Game{
  name: string,
  slug: string,
  img: string,
  released: string,
  rating: number,
  metacritic: number,
  genres: Genre[],
  platforms: Platform[],
}
export interface Genre{
  name: string,
  slug: string,
  img: string,
  games_count: number
}
export interface Platform{
  name: string,
  slug: string,
  games_count: number
}
export interface DateInterval{
  startDate: string;
  endDate: string;
}
