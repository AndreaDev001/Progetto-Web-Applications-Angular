import {Injectable} from '@angular/core';
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

  /**
   * Mostra l'alert all'utente
   */
  public show(): void{
    this.currentAlert.value?.open();
  }

  /**
   * Imposta tutti i valori dell'alert
   * @param title Il titolo dell'alert
   * @param text Il contenuto dell'alert
   * @param open Se mostrare subito l'alert all' utente
   */
  public setAllValues(title: string,text: string,open: boolean): void{
    this.currentTitle.next(title);
    this.currentText.next(text);
    if(open)
      this.show();
  }

  /***
   * Aggiunge una opzione all'alert (pulsante + callback)
   * @param option La nuova opzione da aggiungere
   */
  public addOption(option: AlertOption): void{
    let current: AlertOption[] = this.alertOptions.value;
    current.push(option);
    this.alertOptions.next(current);
  }

  /**
   * Rimuove una opzione dall'alert (pulsante + callback)
   * @param option L'opzione da rimuovere
   */
  public removeOption(option: AlertOption): void{
    let current: AlertOption[] = this.alertOptions.value;
    current.splice(current.indexOf(option),1);
    this.alertOptions.next(current);
  }

  /***
   * Ripristina tutte le opzioni attuali
   */
  public resetOptions(): void{
    this.alertOptions.next([]);
    this.currentCloseCallback.next(() => {});
    this.currentDismissCallback.next(() => {});
  }
  /***
   * Imposta l'alert attuale
   * @param value Il nuovo alert
   */
  public setCurrentAlert(value: any): void{
    this.currentAlert.next(value);
  }

  /**
   * Imposta il titolo dell'alert
   * @param value Il nuovo titolo
   */
  public setCurrentTitle(value: string): void{
    this.currentTitle.next(value);
  }

  /***
   * Imposta il contenuto dell'alert
   * @param value Il nuovo contenuto dell'alert
   */
  public setCurrentText(value: string): void{
    this.currentText.next(value);
  }
  /***
   * Imposta un callback per la chiusura dell'alert (cliccando sul tasto di chiusura)
   * @param value Il nuovo callback da utilizzare
   */
  public setCurrentCloseCallback(value: () => void){
    this.currentCloseCallback.next(value);
  }
  /***
   * Imposta un callback per la chiusura dell'alert (Premendo ESC)
   * @param value Il nuovo callback da utilizzare
   */
  public setCurrentDismissCallback(value: () => void){
    this.currentDismissCallback.next(value);
  }
  public getCurrentAlert(value: boolean): any {return value ? this.currentAlert.value : this.currentAlert};
  public getAlertOptions(value: boolean): any {return value ? this.alertOptions.value : this.alertOptions};
  public getCurrentTitle(value: boolean): any {return value ? this.currentTitle.value : this.currentTitle};
  public getCurrentDismissCallback(value: boolean): any {return value ? this.currentDismissCallback.value : this.currentDismissCallback};
  public getCurrentCloseCallback(value: boolean): any {return value ? this.currentCloseCallback.value : this.currentCloseCallback};
  public getCurrentText(value: boolean): any {return value ? this.currentText.value: this.currentText};
}
