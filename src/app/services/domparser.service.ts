import { Injectable } from '@angular/core';
import {Review} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class DOMParserService
{
  private domParser: DOMParser = new DOMParser();

  constructor() {

  }
  public getElementsText(text: string,requiredSelector: string,body: boolean): string[]{
    let values: string[] = [];
    let document: Document = this.domParser.parseFromString(text,"text/html");
    let elements: NodeListOf<Element>;
    elements = body ? document.body.querySelectorAll(requiredSelector) : document.querySelectorAll(requiredSelector);
    for(let i = 0;i < elements.length;i++){
      let current: Element = elements[i];
      if(current.textContent)
        values.push(current.textContent);
    }
    return values;
  }
  public getElementText(text: string,id: string): string | undefined{
    let document: Document = this.domParser.parseFromString(text,"text/html");
    let element: HTMLElement | null = document.getElementById(id);
    return element ? element.innerText : undefined;
  }
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
