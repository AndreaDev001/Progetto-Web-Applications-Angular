import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MessagePopUpComponent} from "../message-pop-up/message-pop-up.component";

export interface AlertOption{
  name: string,
  className?: string;
  callback: () => void;
}
@Injectable({
  providedIn: 'root'
})
export class AlertHandlerService
{
  private currentAlert: BehaviorSubject<MessagePopUpComponent | undefined> = new BehaviorSubject<MessagePopUpComponent | undefined>(undefined);
  private currentTitle: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
  private currentText: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
  private currentDismissCallback: BehaviorSubject<() => void> = new BehaviorSubject<() => void>(() => {});
  private currentCloseCallback: BehaviorSubject<() => void> = new BehaviorSubject<() => void>(() => {});
  private alertOptions: BehaviorSubject<AlertOption[]> = new BehaviorSubject<AlertOption[]>([]);
  constructor() {

  }
  public show(): void{
    this.currentAlert.value?.open();
  }
  public setAllValues(title: string,text: string,open: boolean): void{
    this.currentTitle.next(title);
    this.currentText.next(text);
    if(open)
      this.show();
  }
  public addOption(option: AlertOption): void{
    let current: AlertOption[] = this.alertOptions.value;
    current.push(option);
    this.alertOptions.next(current);
  }
  public removeOption(option: AlertOption): void{
    let current: AlertOption[] = this.alertOptions.value;
    current.splice(current.indexOf(option),1);
    this.alertOptions.next(current);
  }
  public resetOptions(): void{
    this.alertOptions.next([]);
    this.currentCloseCallback.next(() => {});
    this.currentDismissCallback.next(() => {});
  }
  public getCurrentAlert(value: boolean): any {return value ? this.currentAlert.value : this.currentAlert};
  public getAlertOptions(value: boolean): any {return value ? this.alertOptions.value : this.alertOptions};
  public getCurrentTitle(value: boolean): any {return value ? this.currentTitle.value : this.currentTitle};
  public getCurrentDismissCallback(value: boolean): any {return value ? this.currentDismissCallback.value : this.currentDismissCallback};
  public getCurrentCloseCallback(value: boolean): any {return value ? this.currentCloseCallback.value : this.currentCloseCallback};
  public getCurrentText(value: boolean): any {return value ? this.currentText.value: this.currentText};
  public setCurrentAlert(value: any): void{
    this.currentAlert.next(value);
  }
  public setCurrentTitle(value: string): void{
    this.currentTitle.next(value);
  }
  public setCurrentText(value: string): void{
    this.currentText.next(value);
  }
  public setCurrentCloseCallback(value: () => void){
    this.currentCloseCallback.next(value);
  }
  public setCurrentDismissCallback(value: () => void){
    this.currentDismissCallback.next(value);
  }
}
