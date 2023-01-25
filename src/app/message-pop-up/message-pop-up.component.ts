import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {AlertHandlerService} from "../services/alert-handler.service";

@Component({
  selector: 'app-message-pop-up',
  templateUrl: './message-pop-up.component.html',
  styleUrls: ['./message-pop-up.component.css']
})
export class MessagePopUpComponent implements OnInit,OnDestroy{

  public title?: string;
  public text?: string;
  public buttonText?: string;
  public currentCallback: () => void = () => {};
  private subscriptions: Subscription[] = [];
  private currentRef?: NgbModalRef;
  @ViewChild("content") content?: any;

  constructor(private modalService: NgbModal,private alertHandler: AlertHandlerService) {

  }
  public ngOnInit(): void{
    this.subscriptions.push(this.alertHandler.getCurrentTitle(false).subscribe((value: any) => this.title = value));
    this.subscriptions.push(this.alertHandler.getCurrentText(false).subscribe((value: any) => {
      this.text = value;
    }));
    this.subscriptions.push(this.alertHandler.getCurrentCallback(false).subscribe((value: () => void) => {
      this.currentCallback = value;
    }))
    this.subscriptions.push(this.alertHandler.getCurrentButtonText(false).subscribe((value: any) => this.buttonText = value));
  }
  public ngOnDestroy(): void
  {
     this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
  public open(): void{
    this.currentRef  = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    this.currentRef.closed.subscribe(() => this.currentCallback());
    this.currentRef.dismissed.subscribe(() => this.currentCallback());
  }
}
