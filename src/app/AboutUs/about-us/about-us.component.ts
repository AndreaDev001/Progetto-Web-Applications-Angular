import {Component, OnInit} from '@angular/core';
import { faAngular, faGithub, faJava } from '@fortawesome/free-brands-svg-icons';
import {faA, faCircleUser, IconDefinition} from "@fortawesome/free-solid-svg-icons";
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
    {name: "Visualizzazione recensioni proprie",spring: false,url: "/reviews"}];
  public secondSectionLinks: StringLink[] = [{name: "Gestire Recensioni",spring: false,url: "/games"},
    {name: "Gestire Commenti",spring: false,url: "/games"},
    {name: "Segnalare Recensioni",spring: false,url: "/games"}]
  public thirdSectionLinks: StringLink[] = [{name: "Ricercare Notizie",spring: false,url: "/news"},
    {name: "Autenticazione",spring: true,url: "http://localhost:8080/login"}];
  public fourthSectionLinks: StringLink[] = [{name: "Gestione Utenti",spring: true,url: "http://localhost:8080/userList"},
    {name: "Gestione Segnalazioni",spring: true,url: "http://localhost:8080/reports"},
    {name: "Raccomandati per te",spring: true,url:"http://localhost:8080/recommended"}]
  public icons: IconDefinition[] = [faGithub,faAngular,faJava];

  constructor() {
  }
  public ngOnInit(): void{

  }
}
