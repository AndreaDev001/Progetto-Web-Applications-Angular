import {Component, OnInit} from '@angular/core';
import { faAngular, faGithub, faJava } from '@fortawesome/free-brands-svg-icons';
import {faA, faCircleUser, faKey, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FigureCaption} from "../../interfaces";
import {StringLink} from "../../interfaces";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit{

  public firstSectionLinks: StringLink[] = [{name: "Ricercare Giochi",spring: false,url: "/games"},
    {name: "Visualizzazione dettagli gioco",spring: false, url: "/games/320"},
    {name: "Visualizzazione recensioni proprie (Profilo)",spring: false,url: "/reviews"}];
  public secondSectionLinks: StringLink[] = [{name: "Gestire Recensioni",spring: false,url: "/games"},
    {name: "Gestire Commenti",spring: false,url: "/games"},
    {name: "Segnalare Recensioni",spring: false,url: "/games"},
    {name: "Gestire wishlist (Profilo)",spring: true,url:"/wishlist"}];
  public thirdSectionLinks: StringLink[] = [{name: "Ricercare Notizie",spring: false,url: "/news"},
    {name: "Login",spring: true,url: "http://localhost:8080/login"},
    {name: "Registrazione",spring: false,url: "/registration"},
    {name: "Cambio password",spring: true,url: "http://localhost:8080/recoverAccount"}];
  public fourthSectionLinks: StringLink[] = [{name: "Gestione Utenti (Admin)",spring: true,url: "http://localhost:8080/userList"},
    {name: "Gestione Segnalazioni (Admin)",spring: true,url: "http://localhost:8080/reports"},
    {name: "Raccomandati per te (Profilo)",spring: true,url:"http://localhost:8080/recommended"}]
  constructor() {
  }
  public ngOnInit(): void{

  }
}
