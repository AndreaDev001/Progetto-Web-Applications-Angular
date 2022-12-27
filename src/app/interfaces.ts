
export interface Game{
  id: number,
  name: string,
  slug: string,
  img: string,
  released: string,
  rating: number,
  metacritic: number,
  genres: Genre[],
  platforms: Platform[],

  gameDetails?: GameDetails;
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
export interface GameDetails{
  original_name: string;
  description: string;
  description_raw: string;
  website: string;
  achievementsCount: number;
  reddit_name: string;
  reddit_url :string;
  metacritic_url: string,
  stores?: Store[];
  tags?: Tag[];
  developers?: Developer[];
  publishers?: Publisher[];
  esbrRating?: EsrbRating;
}
export interface Store{
  id: number;
  name: string;
  slug: string;
  image_background: string;
  domain: string;
  games_count: number;
}
export interface Tag{
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}
export interface Developer{
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
export interface Publisher{
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
export interface EsrbRating{
  id: number;
  name: string;
  slug: string;
}
