import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderingMode, OrderingType} from "../enum";
import {BehaviorSubject, Observable} from "rxjs";

export interface ParamType{
  orderingType?: OrderingType;
  orderingMode?: OrderingMode;
  genre?: string;
}
@Injectable({
  providedIn: 'root'
})
export class GameRouterHandlerService {

  private currentParamType: BehaviorSubject<ParamType>;
  constructor(private activatedRoute: ActivatedRoute,private router: Router) {
    this.currentParamType = new BehaviorSubject<ParamType>({
      orderingType: this.activatedRoute.snapshot.queryParams['orderingType'],
      orderingMode: this.activatedRoute.snapshot.queryParams['orderingMode'],
      genre: this.activatedRoute.snapshot.queryParams['genre'],
    });
    this.activatedRoute.queryParams.subscribe((result: any) => this.readParams());
  }
  private readParams(): void{
    let orderingType = this.activatedRoute.snapshot.queryParams['orderingType'];
    let orderingMode = this.activatedRoute.snapshot.queryParams['orderingMode'];
    let genre = this.activatedRoute.snapshot.queryParams['genre'];
    this.setParamType({orderingType: orderingType,orderingMode: orderingMode,genre: genre});
  }
  public setParamType(value: ParamType): void{
    this.router.navigate(['/games'],{
      queryParams: {
        orderingType: value.orderingType,
        orderingMode: value.orderingMode,
        genre: value.genre,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    }).then(() => this.currentParamType.next(value));
  }
  public getCurrentParamType(): Observable<ParamType>{
    return this.currentParamType.asObservable();
  }
}
