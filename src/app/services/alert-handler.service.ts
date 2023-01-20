import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MessagePopUpComponent} from "../message-pop-up/message-pop-up.component";

@Injectable({
  providedIn: 'root'
})
export class AlertHandlerService
{
  private currentAlert: BehaviorSubject<MessagePopUpComponent | undefined> = new BehaviorSubject<MessagePopUpComponent | undefined>(undefined);
  private currentTitle: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
  private currentText: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
  private currentButtonText: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);

  constructor() {

  }
  public show(): void{
    this.currentAlert.value?.open();
  }
  public setAllValues(title: string,text: string,buttonText: string,open: boolean): void{
    this.currentTitle.next(title);
    this.currentText.next(text);
    this.currentButtonText.next(buttonText);
    if(open)
      this.show();
  }
  public getCurrentAlert(value: boolean): any {return value ? this.currentAlert.value : this.currentAlert};
  public getCurrentTitle(value: boolean): any {return value ? this.currentTitle.value : this.currentTitle};
  public getCurrentText(value: boolean): any {return value ? this.currentText.value: this.currentText};
  public getCurrentButtonText(value: boolean): any {return value ? this.currentButtonText.value : this.currentButtonText};

  public setCurrentAlert(value: any): void{
    this.currentAlert.next(value);
  }
  public setCurrentTitle(value: string): void{
    this.currentTitle.next(value);
  }
  public setCurrentText(value: string): void{
    this.currentText.next(value);
  }
  public setCurrentButtonText(value: string): void{
    this.currentButtonText.next(value);
  }
}
