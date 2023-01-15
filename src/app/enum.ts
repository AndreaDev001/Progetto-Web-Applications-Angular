export enum OrderingType{
  NAME = "name",
  RELEASED = "released",
  RATING = "rating",
  METACRITIC = "metacritic"
}
export enum OrderingMode{
  ASCENDED = "ascended",
  DESCENDED = "descended"
}
export enum GameListType{
  SUGGESTED = "suggested",
  BEST_RATED = "best rated",
  JUST_RELEASED = "just released",
}
export enum RequestType{
  GAMES = "games",
  GENRES = "genres",
  PLATFORMS = "platforms",
}
export enum SideListType{
  DEFAULT = "Lists",
  GENRES = "Genres",
  PLATFORMS = "Platforms",
}
export enum SearchEventType{
  COMPLETED = 0,
  FAILED = 1,
  STARTED = 2,
}

export enum FeedbackType {
  like,
  dislike,
  none
}

