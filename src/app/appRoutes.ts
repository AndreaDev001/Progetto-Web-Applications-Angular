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
  {title: 'Creazione recensione', path: ":gameID/newRecensione", component: ReviewComponent},
  {title: 'Recensione',resolve: {review: reviewResolver}, path: "recensioni/:reviewID",component: ReviewComponent},
  {title: 'Home',path: 'games',component: HomePageComponent},
  {title: 'Info',path: 'games/:id',component: GameDetailComponent},
  {path: '',redirectTo: 'games',pathMatch: 'full'},
  {title: 'Registration',path: 'registration', component: RegistrationFormComponent },
  {title: 'News',path: 'news', component: NewsComponent},
  {title: 'About Us',path: 'info', component: AboutUsComponent},
  {title: 'Not Found',path: '**', component: NotFoundComponent}
];
export default appRoutes;
