import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { NewsComponent } from "./news/news.component";
import {RouterModule, Routes} from "@angular/router";
import {RegistrationFormComponent} from "./registration-form/registration-form.component";

const routes: Routes = [
  { path: 'registration', component: RegistrationFormComponent },
  {path: 'news', component: NewsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
