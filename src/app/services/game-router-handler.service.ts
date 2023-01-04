import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderingMode, OrderingType} from "../enum";
import {BehaviorSubject, Observable, Subject} from "rxjs";

export interface ParamType{
  orderingType?: OrderingType;
  orderingMode?: OrderingMode;
  genre?: string;

  minDate?: string;
  maxDate?: string;
  name?: string;
}
@Injectable({
  providedIn: 'root'
})
export class GameRouterHandlerService {

  private currentParamType: Subject<ParamType> = new BehaviorSubject<ParamType>({});
  constructor(private activatedRoute: ActivatedRoute,private router: Router) {
    this.activatedRoute.queryParams.subscribe((result: any) => this.currentParamType.next(this.readParams()));
  }
  private readParams(): ParamType{
    let orderingType = this.activatedRoute.snapshot.queryParams['orderingType'];
    let orderingMode = this.activatedRoute.snapshot.queryParams['orderingMode'];
    let genre = this.activatedRoute.snapshot.queryParams['genre'];
    let minDate = this.activatedRoute.snapshot.queryParams['minDate'];
    let maxDate = this.activatedRoute.snapshot.queryParams['maxDate'];
    let name = this.activatedRoute.snapshot.queryParams['name'];
    return {orderingType: orderingType,orderingMode: orderingMode,genre: genre,minDate: minDate,maxDate: maxDate,name: name};
  }
  public setParamType(value: ParamType): void{
    this.router.navigate(['/games'],{
      queryParams: {
        orderingType: value.orderingType,
        orderingMode: value.orderingMode,
        genre: value.genre,
        minDate: value.minDate,
        maxDate: value.maxDate,
        name: value.name,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }
  public getCurrentParamType(): Observable<ParamType>{
    return this.currentParamType.asObservable();
  }
}
