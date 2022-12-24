import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { GameListComponent } from './HomePage/game-list/game-list.component';
import { GameCardComponent } from './HomePage/game-card/game-card.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import appRoutes from "./appRoutes";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {SideListComponent} from "./side-list/side-list.component";
import { SideItemComponent } from './side-item/side-item.component';
import {SearchHandlerService} from "./services/search-handler.service";
import { ResultPageComponent } from './HomePage/result-page/result-page.component';
import { SortingSelectorComponent } from './HomePage/sorting-selector/sorting-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { StarComponentComponent } from './HomePage/star-component/star-component.component';
import { PlatformListComponent } from './HomePage/platform-list/platform-list.component';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GameListComponent,
    GameCardComponent,
    SideBarComponent,
    SideListComponent,
    SideItemComponent,
    ResultPageComponent,
    SortingSelectorComponent,
    StarComponentComponent,
    PlatformListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
