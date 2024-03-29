export enum DateRange {
  TODAY = "today",
  THIS_WEEK = "this week",
  THIS_MONTH = "this month",
  THIS_YEAR = "this year",
  ALL = "all"
}
export enum Sorting {
  LATEST = "latest",
  RELEVANCY = "relevancy",
  POPULARITY = "popularity"
}
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

