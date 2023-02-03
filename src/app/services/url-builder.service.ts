import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {DateRange, Sorting} from "../enum";

@Injectable({
  providedIn: 'root'
})

// Servizio utilizzato per costruire l'url per effettuare la ricerca di notizie
// tramite API in accordo con i parametri keywords, data di pubblicazione e
// ordinamento correntemente selezionati
export class UrlBuilderService {
  newsApiKey: string =  "6babce9602e74985ae5a69d08718eeea";

  defaultUrl: string = "https://newsapi.org/v2/everything?q=rpg&language=en&pageSize=20";
  baseUrl: string = "https://newsapi.org/v2/everything?language=en&searchIn=title,description&pageSize=20";
  url: string = this.defaultUrl;

  private httpParams = new HttpParams();

  constructor() { }

  initUrl(): void {
    this.url = this.defaultUrl;
  }

  // imposta il parametro 'q' e lo aggiunge a this.httpParams
  addKeywords(keywords: String[]): void {
    let paramKeywords = "";

    // keywords di default
    if (keywords.length === 0) {
      this.url = this.defaultUrl;
    }
    // keywords dell'utente
    else {
      for (let i = 0; i < keywords.length; i++) {
        if (i != 0) {
          paramKeywords += '+';
        }
        paramKeywords += keywords[i];
      }
    }

    this.httpParams = this.httpParams.append('q', paramKeywords)
  }

  // imposta i parametri 'from' e 'to' e li aggiunge a this.httpPArams
  addDateFilter(dateRange: DateRange): void {
    if (dateRange !== DateRange.ALL) {
      var now = new Date();

      // setting from date:
      var fromDate = new Date();
      switch (dateRange) {
        case DateRange.TODAY:
          fromDate.setDate(now.getDate());
          break;
        case DateRange.THIS_WEEK:
          fromDate.setDate(now.getDate() - 7);
          break;
        case DateRange.THIS_MONTH:
          fromDate.setDate(1);
          fromDate.setMonth(now.getMonth());
          fromDate.setFullYear(now.getFullYear());
          break;
        case DateRange.THIS_YEAR:
          var year = now.getFullYear();
          fromDate.setDate(1);
          fromDate.setMonth(0);
          fromDate.setFullYear(year);
          break;
        default:
          break;
      }

      this.httpParams = this.httpParams.append('from', fromDate.toISOString().substring(0, 10))
      this.httpParams = this.httpParams.append('to', now.toISOString().substring(0, 10))
    }
  }

  // imposta il parametro 'sortBy' e lo aggiunge a this.httpParams
  addSorting(sortingType: Sorting): void {
    if (sortingType === Sorting.LATEST) {
      this.httpParams = this.httpParams.append('sortBy', 'publishedAt')
    }
    else {
      this.httpParams = this.httpParams.append('sortBy', sortingType)
    }
  }

  // imposta il parametro 'page' e lo aggiunge a this.httpParams
  addCurrentPage(page: number) {
    this.httpParams = this.httpParams.append('page', page)
  }


  // imposta il parametro 'apiKey' e lo aggiunge a this.httpParams
  // Invocato quando l'url è completo
  buildUrl(): {url: string, queryParams: HttpParams} {
    this.httpParams = this.httpParams.append('apiKey', this.newsApiKey)
    let finalUrl = {url: this.url, queryParams: this.httpParams}
    return finalUrl
  }

  // resetta l'url a quello di pase, eliminando tutti i parametri personalizzabili
  // precedentemente impostati
  public resetUrl(): void{
    this.url = this.baseUrl;
    this.httpParams = new HttpParams();
  }
}
