import { Routes } from "@angular/router";
import {ReviewComponent} from "./review/review.component";
import { reviewResolver } from "./review/review.service";

const appRoutes: Routes = [
  {title: "CREAZIONE RECENSIONE", path: ":gameID/newRecensione", component: ReviewComponent},
  {title: "RECENSIONE",resolve: {review: reviewResolver}, path: "recensioni/:reviewID", component: ReviewComponent}];
export default appRoutes;
