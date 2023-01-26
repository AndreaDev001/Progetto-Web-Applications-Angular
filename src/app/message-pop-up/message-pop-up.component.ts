import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {AlertHandlerService, AlertOption} from "../services/alert-handler.service";

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
  private currentRef?: NgbModalRef;
  public options: AlertOption[] = [];
  public currentCloseCallback: () => void = () => {};
  public currentDismissCallback: () => void = () => {};
  @ViewChild("content") content?: any;

  constructor(private modalService: NgbModal,private alertHandler: AlertHandlerService) {

  }
  public ngOnInit(): void{
    this.subscriptions.push(this.alertHandler.getAlertOptions(false).subscribe((value: AlertOption[]) => this.options = value));
    this.subscriptions.push(this.alertHandler.getCurrentTitle(false).subscribe((value: any) => this.title = value));
    this.subscriptions.push(this.alertHandler.getCurrentText(false).subscribe((value: any) => this.text = value));
    this.subscriptions.push(this.alertHandler.getCurrentCloseCallback(false).subscribe((value: () => void) => this.currentCloseCallback = value));
    this.subscriptions.push(this.alertHandler.getCurrentDismissCallback(false).subscribe((value: () => void) => this.currentDismissCallback = value));
  }
  public ngOnDestroy(): void
  {
     this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
  public open(): void{
    this.currentRef  = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    this.currentRef.dismissed.subscribe(() => this.currentDismissCallback());
  }
  public call(option: AlertOption): void{
    this.currentRef?.close();
    option.callback();
  }
  public defaultCloseOperation(): void {
    this.currentRef?.close();
    this.currentCloseCallback();
  }
}
