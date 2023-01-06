import { Output } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";


/**
   * @param observable the observable to be called
   * @param resultHandler the function that will handle the result, error or result is undefined depending on the response
   */
export function callObserver<T>(observable : Observable<T>, resultHandler : (result ?: T, error ?: any) => void) : void
{
  observable.pipe(catchError(error => {
    resultHandler?.(undefined, error); return throwError(() => error);
  })).subscribe(result => resultHandler?.(result, undefined));
}

export class ObserverStatus
{
  public isLoading: boolean = false;

  public call<T>(observable : Observable<T>, resultHandler : (result : T) => void, errorHandler ?: (error : any) => void)
  {
    if(this.isLoading)
      return;
    this.isLoading = true;
    observable.pipe(catchError(error => {
      this.isLoading = false;
      errorHandler?.(error);
      return throwError(() => error);
    })).subscribe(result => {
      this.isLoading = false;
      resultHandler(result);
    });
  }
}

