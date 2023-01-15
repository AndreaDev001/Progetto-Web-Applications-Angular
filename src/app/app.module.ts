import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import appRoutes from "./appRoutes";
import {RouterModule} from "@angular/router";
import { NewsComponent } from './news/news.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NewsResultsComponent } from './news-results/news-results.component';
import { NoResultsComponent } from './no-results/no-results.component';
import { DateFilterComponent } from './date-filter/date-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    SearchBarComponent,
    NewsResultsComponent,
    NoResultsComponent,
    DateFilterComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
