import {Injectable} from '@angular/core';
import {
  Achievement,
  Developer,
  EsrbRating,
  Game,
  GameDetails,
  Genre,
  Platform,
  Publisher,
  Screenshot,
  Store,
  Tag,
  Trailer
} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class GameJSONReaderService {

  constructor() {

  }

  /***
   * Legge tutti i giochi di contenuti in una array
   * @param value L'array contenente i giochi in formato JSON
   */
  public readGames(value: any): Game[]{
    let values: Game[] = [];
    for(let current of value)
         values.push(this.readGame(current));
    return values;
  }

  /***
   * Legge i dettagli di un gioco in formato JSON
   * @param value I dettagli del gioco in formato JSON
   */
  public readGameDetails(value: any): GameDetails{
    let id: number = value.id;
    let original_name: string = value.name_original;
    let description: string = value.description;
    let description_raw: string = value.description_raw;
    let releaseDate: string = value.released;
    let website: string = value.website;
    let rating: number = value.metacritic;
    let image_background: string = value.background_image;
    if(!image_background)
      image_background = "data:image/jpeg;base64,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";
    let achievementsCount: number = value.achievementsCount;
    let redditName: string = value.reddit_name;
    let redditUrl: string = value.reddit_url;
    let metaCriticUrl: string = value.metacritic_url;
    let stores: Store[] = this.readStores(value.stores);
    let developers: Developer[] = this.readDevelopers(value.developers);
    let publishers: Publisher[] = this.readPublishers(value.publishers);
    let tags: Tag[] = this.readTags(value.tags);
    let genres: Genre[] = this.readGenres(value.genres);
    let platforms: Platform[] = this.readPlatforms(value.platforms);
    let esrb_rating = value.esrb_rating;
    let currentEsrb: EsrbRating | undefined = esrb_rating ? this.readEsrbRating(esrb_rating) : undefined;
    return {id: id,original_name: original_name,description: description,releaseDate: releaseDate,rating: rating,description_raw: description_raw,
    website: website,genres: genres,platforms: platforms,image_background: image_background,achievementsCount: achievementsCount,reddit_name: redditName,reddit_url: redditUrl,
    metacritic_url: metaCriticUrl,stores: stores,developers: developers,publishers: publishers,tags: tags,esbrRating: currentEsrb};
  }

  /***
   * Legge i negozi di un gioco in formato JSON
   * @param value I negozi del gioco in formato JSON
   */
  public readStores(value: any): Store[]{
    let stores: Store[] = [];
    for(let current of value)
      stores.push(this.readStore(current.store));
    return stores;
  }

  /***
   * Legge gli sviluppatori di un gioco in formato JSON
   * @param value Gli sviluppatori del gioco in formato JSON
   */
  public readDevelopers(value: any): Developer[]{
    let developers: Developer[] = [];
    for(let current of value)
        developers.push(this.readDeveloper(current));
    return developers;
  }

  /***
   * Legge i publisher di un gioco in formato JSON
   * @param value I publisher del gioco in formato JSON
   */
  public readPublishers(value: any): Publisher[]{
    let publishers: Publisher[] = [];
    for(let current of value)
         publishers.push(this.readPublisher(current));
    return publishers;
  }

  /***
   * Legge gli screenshots di un gioco in formato JSON
   * @param value Gli screenshots di un gioco in formato JSON
   */
  public readScreenshots(value: any): Screenshot[]{
    let screenshots: Screenshot[] = [];
    for(let current of value)
      screenshots.push(this.readScreenshot(current));
    return screenshots;
  }

  /***
   * Legge le tag di un gioco in formato JSON
   * @param value Le tag di un gioco in formato JSON
   */
  public readTags(value: any): Tag[]{
    let tags: Tag[] = [];
    for(let current of value)
      tags.push(this.readTag(current));
    return tags;
  }

  /***
   * Legge gli obiettivi di un gioco in formato JSON
   * @param value Gli obiettivi di un gioco in formato JSON
   */
  public readAchievements(value: any): Achievement[]{
    let achievements: Achievement[] = [];
    for(let current of value)
      achievements.push(this.readAchievement(current));
    return achievements;
  }

  /***
   * Legge i trailer di un gioco in formato JSON
   * @param value I trailer di un gioco in formato JSON
   */
  public readTrailers(value: any): Trailer[]{
    let trailers: Trailer[] = [];
    for(let current of value)
      trailers.push(this.readTrailer(current));
    return trailers;
  }

  /**
   * Legge un singolo sviluppatore in formato JSON
   * @param value Lo sviluppatore in formato JSON
   */
  public readDeveloper(value: any): Developer{
    let id: number = value.id;
    let name: string = value.name;
    let slug: string = value.slug;
    let games_count: number = value.games_count;
    let image_background: string = value.image_background;
    return {id: id,name: name,slug: slug,games_count: games_count,image_background: image_background};
  }

  /***
   * Legge un singolo negozio in formato JSON
   * @param value Il negozio in formato JSON
   */
  public readStore(value: any): Store{
    let id: number = value.id;
    let name: string = value.name;
    let slug: string = value.slug;
    let domain: string = value.domain;
    let games_count: number = value.games_count;
    let image_background: string = value.image_background;
    return {id: id,name: name,slug: slug,domain: domain,games_count: games_count,image_background: image_background};
  }

  /***
   * Legge una tag in formato JSON
   * @param value La tag in formato JSON
   */
  public readTag(value: any): Tag{
    let id: number = value.id;
    let name: string = value.name;
    let slug: string = value.slug;
    let language: string = value.language;
    let games_count: number = value.games_count;
    let image_background: string = value.image_background;
    return {id: id,name: name,slug: slug,language: language,games_count: games_count,image_background: image_background};
  }

  /***
   * Legge un achievement in formato JSON
   * @param value L'achievement in formato JSON
   */
  public readAchievement(value: any): Achievement{
    let id: number = value.id;
    let name: string = value.name;
    let description: string = value.description;
    let image: string = value.image;
    let percent: number = value.percent;
    return {id: id,name: name,description: description,image: image,percent: percent};
  }

  /***
   * Legge un trailer in formato JSON
   * @param value Il trailer in formato JSON
   */
  public readTrailer(value: any): Trailer{
    let id: number = value.id;
    let name: string = value.name;
    let preview: string = value.preview;
    let lowQuality: string = value.data.min;
    let highQuality: string = value.data.max;
    return {id: id,name: name,preview: preview,lowQuality: lowQuality,highQuality: highQuality};
  }

  /***
   * Legge una votazione ESRB in formato JSON
   * @param value La votazione ESRB in formato JSON
   */
  public readEsrbRating(value: any): EsrbRating{
    let id: number = value.id;
    let name: string = value.name;
    let slug: string = value.slug;
    return {id: id,name: name,slug:slug};
  }

  /***
   * Legge un publisher in formato JSON
   * @param value Il publisher in formato JSON
   */
  public readPublisher(value: any): Publisher{
    let id: number = value.id;
    let name: string = value.name;
    let slug: string = value.slug;
    let games_count: number = value.games_count;
    let image_background: string = value.image_background;
    return {id: id,name: name,slug: slug,games_count: games_count,image_background: image_background};
  }

  /***
   * Legge uno screenshot in formato JSON
   * @param value Lo screenshot in formato JSON
   */
  public readScreenshot(value: any): Screenshot{
    let id: number = value.id;
    let image: string = value.image;
    let width: number = value.width;
    let height: number = value.height;
    let isDeleted: boolean = value.is_deleted;
    return {id: id,name: image,width: width,height: height,is_deleted: isDeleted};
  }

  /***
   * Legge un gioco in formato JSON
   * @param value Il gioco in formato JSON
   */
  public readGame(value: any): Game{
    let id: number = value.id;
    let name: string = value.name;
    let slug: string = value.slug;
    let img: string = value.background_image;
    if(img == null)
       img = "https://i.imgur.com/EtG4HeX.jpg";
    let released: string = value.released;
    let rating: number = value.rating;
    let metacritic: number = value.metacritic;
    let genres = value.genres;
    let platforms = value.platforms;
    let foundGenres: Genre[] = this.readGenres(genres);
    let foundPlatforms: Platform[] = this.readPlatforms(platforms);
    return {id: id,name: name,slug: slug,background_image: img,released: released,rating: rating,metacritic: metacritic,genres: foundGenres,platforms: foundPlatforms};
  }

  /***
   * Legge i generi di un gioco in formato JSON
   * @param value I generi in formato JSON
   */
  public readGenres(value: any): Genre[]{
    if(value == null)
        return [];
    let values: Genre[] = [];
    for(let current of value)
         values.push(this.readGenre(current));
    return values;
  }

  /***
   * Legge le piattaforme di un gioco in formato JSON
   * @param value Le piattaforme in formato JSON
   */
  public readPlatforms(value: any): Platform[]{
    if(value == null)
      return [];
    let values: Platform[] = [];
    for(let current of value)
        values.push(current.platform != undefined ? this.readPlatform(current.platform) : this.readPlatform(current));
    return values;
  }

  /***
   * Legge un singolo genere in formato JSON
   * @param value Il genere in formato JSON
   */
  public readGenre(value: any): Genre{
    let name = value.name;
    let slug = value.slug;
    let img = value.image_background;
    let games_count = value.games_count;
    return {name: name,slug: slug,img: img,games_count: games_count};
  }

  /***
   * Legge una singola piattaforma in formato JSON
   * @param value La piattaforma in formato JSON
   */
  public readPlatform(value: any): Platform{
    let name = value.name;
    let slug = value.slug;
    let games_count = value.games_count;
    return {name: name,slug: slug,games_count: games_count};
  }
}
