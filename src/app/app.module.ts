import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { GameListComponent } from './HomePage/game-list/game-list.component';
import { GameCardComponent } from './HomePage/game-card/game-card.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import appRoutes from "./appRoutes";
import { SideBarComponent } from './HomePage/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GameListComponent,
    GameCardComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
