import {Component, OnInit} from '@angular/core';
import {UrlBuilderService} from "../services/url-builder.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  constructor(
    private urlBuilder: UrlBuilderService
  ) {}

  ngOnInit(): void {
    this.subscribeToNews(this.urlBuilder.buildUrl())
    this.urlBuilder.resetUrl();
  }

  keywords: string[] = [];

  updateKeywords(newKeywords: string) {
    this.keywords = newKeywords.split(/\s+/);
    console.log("new keywords: ", this.keywords)  // todo: debug
    // todo: resetta numero di apgina corrente (la nuova ricerca deve partire da pag 1)
    this.search() // todo: fai partire ricerca

  }

  subscribeToNews(url: string): void {
    // todo
  }

  search() {
    this.urlBuilder.addKeywords(this.keywords)

    var url = this.urlBuilder.buildUrl()
    console.warn("CIAO:\n" + url)

    this.urlBuilder.resetUrl()
  }
}
