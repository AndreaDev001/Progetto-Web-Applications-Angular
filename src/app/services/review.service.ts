import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import { catchError, EMPTY, mergeMap, Observable, of, throwError } from 'rxjs';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Review } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  getReview(reviewID: number) : Observable<Review>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("reviewID", reviewID);
    return this.httpClient.get<Review>("http://localhost:8080/getReview", {params: queryParams});
  }

  publish(review: Review) : Observable<number>
  {
    return this.httpClient.post<number>("http://localhost:8080/publishReview", review);
  }

  edit(review: Review) : Observable<boolean>
  {
    return this.httpClient.post<boolean>("http://localhost:8080/editReview", review);
  }
}

export const reviewResolver: ResolveFn<Review> = (route: ActivatedRouteSnapshot) : Observable<Review> =>  {
  const router = inject(Router);
  const cs = inject(ReviewService);
  const id : string = route.paramMap.get('reviewID')!;


  return cs.getReview(parseInt(id)).pipe(mergeMap(review => {
    if (review) {
      return of(review);
    } else {  // id not found
      router.navigate(['/']);
      return EMPTY;
    }
  }));
};

export enum FeedbackType
{
  like,
  dislike,
  none
}
