import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
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
  private subscriptions: Subscription[] = [];
  @ViewChild("content") content?: any;

  constructor(private modalService: NgbModal,private alertHandler: AlertHandlerService) {

  }
  public ngOnInit(): void{
    this.subscriptions.push(this.alertHandler.getCurrentTitle(false).subscribe((value: any) => this.title = value));
    this.subscriptions.push(this.alertHandler.getCurrentText(false).subscribe((value: any) => this.text = value));
    this.subscriptions.push(this.alertHandler.getCurrentButtonText(false).subscribe((value: any) => this.buttonText = value));
  }
  public ngOnDestroy(): void
  {
     this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
  public open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
