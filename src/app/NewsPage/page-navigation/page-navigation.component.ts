import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsSearchService} from "../../services/news-search.service";
import {faChevronLeft, faChevronRight, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.css']
})

export class PageNavigationComponent implements OnInit {
  @Output() currentPageChanged = new EventEmitter<number>()

  isFirstPage: boolean = true;
  isLastPage: boolean = false;
  @Input() currentPage: number = 1;

  public chevronRight: IconDefinition = faChevronRight;
  public chevronLeft: IconDefinition = faChevronLeft;

  constructor(
    private newsSearchService: NewsSearchService
  ) {}

  totalResults: number = 0;
  newsPerPage: number = 20;
  currentLastPage: number = 1;
  pages: number[] = []

  ngOnInit() {
    this.newsSearchService.getPassedResults().subscribe(
      (response: any) => {
        this.totalResults = (response.totalResults > 100) ? 100 : response.totalResults // si possono ricevere dall'API max 100 risultati per ricerca
        if (this.totalResults % this.newsPerPage === 0) {
          this.currentLastPage = this.totalResults / this.newsPerPage
        }
        else {
          this.currentLastPage = Math.floor(this.totalResults / this.newsPerPage) + 1
        }

        // riempio this.pages con i numeri corrispondenti alle pagine prodotte dalla ricerca
        if (this.pages.length != 0) {
          this.pages = []
        }
        for (let i = 1; i <= this.currentLastPage; ++i) {
          this.pages.push(i)
        }

        // se la pagina corrente è la prima della raccolta, imposto this.isFirstPage = true,
        // cosicchè il bottone per caricare la pagina precedente possa essere disabilitato
        if (this.currentPage === 1) {
          this.isFirstPage = true
        }
        else { this.isFirstPage = false }

        // se la pagina corrente è l'ultima della raccolta, imposto this.isLastPage = true,
        // cosicchè il bottone per caricare la pagina successiva possa essere disabilitato
        if (this.currentPage == this.currentLastPage) {
          this.isLastPage = true
        }
        else { this.isLastPage = false }


      }
    )
  }

  // Invocato per passare alla pagina successiva dei risultati.
  // Incrementa di una this.currentPage e ne comunica il nuovo valore al componente padre (news)
  loadNextPage() {
    this.currentPage++
    this.currentPageChanged.emit(this.currentPage)
  }

  // Invocato per passare alla pagina precedente dei risultati.
  // Incrementa di una this.currentPage e ne comunica il nuovo valore al componente padre (news)
  loadPreviousPage() {
    this.currentPage--
    this.currentPageChanged.emit(this.currentPage)
  }

  // Invocato per passare ad una pagina specifica dei risultati.
  // Incrementa di una this.currentPage e ne comunica il nuovo valore al componente padre (news)
  loadPage(page: number): void {
    this.currentPage = page
    this.currentPageChanged.emit(this.currentPage)
  }
}
