import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import appRoutes from "./appRoutes";
import {RouterModule} from "@angular/router";
import { NewsComponent } from './news/news.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NewsResultsComponent } from './news-results/news-results.component';
import { NoResultsComponent } from './no-results/no-results.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { SortingFilterComponent } from './sorting-filter/sorting-filter.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CustomHttpInterceptor} from "./util/http-interceptor";
import { PageNavigationComponent } from './page-navigation/page-navigation.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    SearchBarComponent,
    NewsResultsComponent,
    NoResultsComponent,
    DateFilterComponent,
    SortingFilterComponent,
    PageNavigationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true  // ok false se c'è solo un interceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
