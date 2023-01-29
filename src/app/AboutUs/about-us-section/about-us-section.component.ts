import {Component, Input, OnInit} from '@angular/core';
import {faCircleUser, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {overflowItem} from "../../DetailsPage/text-overflow/text-overflow.component";
import {FigureCaption, StringLink} from "../../interfaces";
import {SpringHandlerService} from "../../services/spring-handler.service";


@Component({
  selector: 'app-about-us-section',
  templateUrl: './about-us-section.component.html',
  styleUrls: ['./about-us-section.component.css']
})
export class AboutUsSectionComponent implements OnInit
{
   @Input() name: string = "Nome";
   @Input() matricola: string = "Matricola";
   @Input() techUsed: string[] = [];
   @Input() pictureCaptions: FigureCaption[] = [];
   @Input() stringLinks: StringLink[] = [];
   public userIcon: IconDefinition = faCircleUser;

   constructor(public springHandler: SpringHandlerService)
   {

   }
   public ngOnInit(): void
   {

   }
   public createItems(): overflowItem[]{
     let overflowItems: overflowItem[] = [];
     for(let current of this.techUsed)
       overflowItems.push({name: current})
     return overflowItems;
   }
}
