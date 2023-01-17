import { Routes } from "@angular/router";
import {ReviewComponent} from "./ReviewPage/review/review.component";
import { reviewResolver } from "./services/review.service";
import {HomePageComponent} from "./HomePage/home-page/home-page.component";
import {GameDetailComponent} from "./DetailsPage/game-detail/game-detail.component";
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {NewsComponent} from "./NewsPage/news/news.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const appRoutes: Routes = [
  {title: "CREAZIONE RECENSIONE", path: ":gameID/newRecensione", component: ReviewComponent},
  {title: "RECENSIONE",resolve: {review: reviewResolver}, path: "recensioni/:reviewID", component: ReviewComponent},
  {path: 'games',component: HomePageComponent},
  {path: 'games/:id',component: GameDetailComponent},
  {path: '',redirectTo: 'games',pathMatch: 'full'},
  { path: 'registration', component: RegistrationFormComponent },
  {path: 'news', component: NewsComponent},
  {path: 'info', component: AboutUsComponent},
  {path: '**', component: NotFoundComponent}
];
export default appRoutes;
