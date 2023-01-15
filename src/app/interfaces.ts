

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
  id: number;
  original_name: string;
  description: string;
  releaseDate: string;
  description_raw: string;
  rating: number;
  image_background: string;
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
  genres: Genre[];
  platforms: Platform[];
}
export interface Store{
  id: number;
  name: string;
  slug: string;
  image_background: string;
  domain: string;
  games_count: number;
}
export interface GameInfo{
  id: number;
  name: string;
  description: string;
  released?: string;
  rating?: number;
  image?: string;
  stores: StoreLink[] | undefined;
  website?: string;
  reddit_url?: string;
  metacritic_url?: string;
  esrbRating?: string;
  genres?: string[];
  platforms?: string[];
}
export interface StoreLink{
  name: string,
  link: string,
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
export interface Screenshot{
  id: number;
  name: string;
  width: number;
  height: number;
  is_deleted: boolean;
}
export interface Achievement{
  id: number;
  name: string;
  description: string;
  image: string;
  percent: number;
}
export interface Trailer{
  id: number;
  name: string;
  preview: string;
  lowQuality: string;
  highQuality: string;
}
export interface Review
{
  id?: number;
  titolo:  string;
  contenuto: string,
  voto: number;
  numeroMiPiace?: number;
  numeroNonMiPiace?: number;
  utente?: string;
  gioco?: number;
}
export interface Utente{
  email: string;
  username: string;
  amministratore: boolean;
  bandito: boolean;
}
