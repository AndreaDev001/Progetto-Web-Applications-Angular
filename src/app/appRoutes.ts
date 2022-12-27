import {Routes} from "@angular/router";
import {HomePageComponent} from "./HomePage/home-page/home-page.component";
import {GameDetailComponent} from "./game-detail/game-detail.component";


const appRoutes: Routes = [
  {path: 'games',component: HomePageComponent},
  {path: 'games/:id',component: GameDetailComponent},
  {path: '',redirectTo: 'games',pathMatch: 'full'},
]
export default appRoutes;
