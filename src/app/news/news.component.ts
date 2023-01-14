import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent {
  keywords: string[] = [];

  updateKeywords(newKeywords: string) {
    this.keywords = newKeywords.split(/\s+/);
    console.log("new keywords: ", this.keywords)  // todo: debug
    // todo: fai partire una nuova ricerca con le keywords aggiornate
  }
}
