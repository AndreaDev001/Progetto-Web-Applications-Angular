import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DOMParserService
{
  private domParser: DOMParser = new DOMParser();

  constructor() {

  }
  /**
   * Ritorna il primo testo contenuto in un file html
   * @param text Il testo html
   */
  public findFirstText(text: string): string | undefined{
    let document: Document = this.domParser.parseFromString(text,"text/html");
    let all: HTMLCollectionOf<Element> = document.getElementsByTagName("*");
    for(let i = 0;i < all.length;i++){
      let current: Element = all[i];
      if(current.textContent && current.textContent != "")
        return current.textContent;
    }
    return undefined;
  }
}
