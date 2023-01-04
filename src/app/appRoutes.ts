import {Routes} from "@angular/router";
import {HomePageComponent} from "./HomePage/home-page/home-page.component";


const appRoutes: Routes = [
  {path: 'games',component: HomePageComponent},
  {path: '',redirectTo: 'games',pathMatch: 'full'},
]
export default appRoutes;
