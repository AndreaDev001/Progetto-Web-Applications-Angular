import { Routes } from "@angular/router";
import {ReviewComponent} from "./review/review.component";
import { reviewResolver } from "./review/review.service";
import {HomePageComponent} from "./HomePage/home-page/home-page.component";

const appRoutes: Routes = [
  {title: "CREAZIONE RECENSIONE", path: ":gameID/newRecensione", component: ReviewComponent},
  {title: "RECENSIONE",resolve: {review: reviewResolver}, path: "recensioni/:reviewID", component: ReviewComponent},
  {path: 'games',component: HomePageComponent},
  {path: '',redirectTo: 'games',pathMatch: 'full'}
];

export default appRoutes;
