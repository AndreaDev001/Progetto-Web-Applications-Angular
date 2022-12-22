import { Injectable } from '@angular/core';
import {Game, Genre, Platform} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class GameJSONReaderService {

  constructor() {

  }
  public readGames(value: any): Game[]{
    let values: Game[] = [];
    for(let current of value)
         values.push(current);
    return values;
  }
  public readGame(value: any): Game{
    let name: string = value.name;
    let slug: string = value.slug;
    let img: string = value.background_image;
    let rating: number = value.rating;
    let metacritic: number = value.metacritic;
    let genres = value.genres;
    let platforms = value.platforms;
    let foundGenres: Genre[] = this.readGenres(genres);
    let foundPlatforms: Platform[] = this.readPlatforms(platforms);
    return {name: name,slug: slug,img: img,rating: rating,metacritic: metacritic,genres: foundGenres,platforms: foundPlatforms};
  }
  public readGenres(value: any): Genre[]{
    let values: Genre[] = [];
    for(let current of value)
         values.push(current);
    return values;
  }
  public readPlatforms(value: any): Platform[]{
    let values: Platform[] = [];
    for(let current of value)
        values.push(current);
    return values;
  }
  public readGenre(value: any): Genre{
    let name = value.name;
    let slug = value.slug;
    let img = value.image_background;
    let games_count = value.games_count;
    return {name: name,slug: slug,img: img,games_count: games_count};
  }
  public readPlatform(value: any): Platform{
    let name = value.name;
    let slug = value.slug;
    let games_count = value.games_count;
    return {name: name,slug: slug,games_count: games_count};
  }
}
