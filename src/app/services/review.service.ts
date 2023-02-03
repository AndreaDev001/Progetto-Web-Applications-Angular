import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EMPTY, map, mergeMap, Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, ResolveFn, Router} from '@angular/router';
import {Review} from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  getReview(reviewID: number, jsessionid: string) : Observable<Review>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("reviewID", reviewID);
    queryParams = queryParams.append("jsessionid", jsessionid);
    return this.httpClient.get<any>("http://localhost:8080/getReview", {params: queryParams}).pipe(map(result => {
      let review = <Review>result.review;
      review.currentFeedback = FeedbackType[result.feedback as keyof typeof FeedbackType];
      return review;
    }));
  }

  publish(review: Review) : Observable<number>
  {
    return this.httpClient.post<number>("http://localhost:8080/publishReview", review);
  }

  edit(review: Review) : Observable<boolean>
  {
    return this.httpClient.post<boolean>("http://localhost:8080/editReview", review);
  }

  delete(review: Review) : Observable<void>
  {
    return this.httpClient.delete<void>("http://localhost:8080/deleteReview/" + review.id);
  }

  report(review: Review, username: string, motivazione: string) : Observable<any>
  {
    return this.httpClient.post<any>("http://localhost:8080/reportReview", {
      recensione: review,
      utente: username,
      motivazione: motivazione
    });
  }

  public changeFeedback(reviewID: number, isLike : boolean, username: string) : Observable<FeedbackType>
  {
      return this.httpClient.post<string>("http://localhost:8080/changeReviewFeedback", {
        recensione: reviewID,
        tipo: isLike,
        utente: username
      }, {responseType: 'text' as any}).pipe(map(value => FeedbackType[value as keyof typeof FeedbackType]));
  }

}

export const reviewResolver: ResolveFn<Review> = (route: ActivatedRouteSnapshot) : Observable<Review> =>  {
  const router = inject(Router);
  const cs = inject(ReviewService);
  const id : string = route.paramMap.get('reviewID')!;
  const jsessionid : string = route.queryParamMap.get('jsessionid')!;
  return cs.getReview(parseInt(id), jsessionid).pipe(mergeMap(review => {
    if (review) {
      return of(review);
    } else {  // id not found
      router.navigate(['/notFound']);
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
