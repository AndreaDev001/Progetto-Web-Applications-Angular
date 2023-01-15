import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ReviewComponent } from './ReviewPage/review/review.component';
import { CommentComponent } from './ReviewPage/comment/comment.component';



import { NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {AutosizeModule} from 'ngx-autosize';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { GameListComponent } from './HomePage/ResultPage/game-list/game-list.component';
import { GameCardComponent } from './HomePage/ResultPage/game-card/game-card.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AppRoutingModule } from './app-routing.module';

import {SideBarComponent} from "./HomePage/SideBar/side-bar/side-bar.component";
import {SideListComponent} from "./HomePage/SideBar/side-list/side-list.component";
import { SideItemComponent } from './HomePage/SideBar/side-item/side-item.component';

import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ResultPageComponent } from './HomePage/ResultPage/result-page/result-page.component';
import { SortingSelectorComponent } from './HomePage/OptionBar/sorting-selector/sorting-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { StarComponentComponent } from './HomePage/ResultPage/star-component/star-component.component';
import { PlatformListComponent } from './HomePage/ResultPage/platform-list/platform-list.component';
import {DatePipe} from "@angular/common";
import { DateSelectorComponent } from './HomePage/OptionBar/date-selector/date-selector.component';
import { OptionBarComponent } from './HomePage/OptionBar/option-bar/option-bar.component';
import {SearchBarComponent} from "./HomePage/OptionBar/search-bar/search-bar.component";
import { GameDetailComponent } from './DetailsPage/game-detail/game-detail.component';
import { ImageSliderComponent } from './DetailsPage/image-slider/image-slider.component';
import { TextOverflowComponent } from './DetailsPage/text-overflow/text-overflow.component';
import { GameAdditionalInfoComponent } from './DetailsPage/game-additional-info/game-additional-info.component';
import { GameMainInfoComponent } from './DetailsPage/game-main-info/game-main-info.component';
import { GameDetailsMediaComponent } from './DetailsPage/game-details-media/game-details-media.component';
import { VideoSelectorComponent } from './DetailsPage/video-selector/video-selector.component';
import { GameReviewComponent } from './DetailsPage/game-review/game-review.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import appRoutes from "./appRoutes";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    ReviewComponent,
    CommentComponent,
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
    DateSelectorComponent,
    OptionBarComponent,
    SearchBarComponent,
    GameDetailComponent,
    ImageSliderComponent,
    TextOverflowComponent,
    GameAdditionalInfoComponent,
    GameMainInfoComponent,
    GameDetailsMediaComponent,
    VideoSelectorComponent,
    GameReviewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    FormsModule,
    AutosizeModule,
    FontAwesomeModule,
    NgbModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
