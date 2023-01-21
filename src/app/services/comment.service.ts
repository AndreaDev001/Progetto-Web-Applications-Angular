import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import { EMPTY, first, map, Observable } from 'rxjs';
import { FeedbackType } from '../enum';
import { Utente } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  public getComments(reviewID : number, startIndex : number, size : number) : Observable<Comment[]>
  {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("reviewID", reviewID);
      queryParams = queryParams.append("startIndex", startIndex);
      queryParams = queryParams.append("commentsSize", size);
      return this.httpClient.get<Comment[]>("http://localhost:8080/getComments", {params: queryParams});
  }

  public changeFeedback(commentID: number, isLike : boolean, username: string) : Observable<string>
  {
      return this.httpClient.post<string>("http://localhost:8080/changeFeedback", {
        commento: commentID,
        tipo: isLike,
        utente: username
      }, {responseType: 'text' as any});
  }

  public getCommentFeedback(commentID: number): Observable<FeedbackType>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("commentID", commentID);
    return this.httpClient.get<string>("http://localhost:8080/getCommentFeedback", {responseType: 'text' as any, params: queryParams}).pipe(map(value => FeedbackType[value as keyof typeof FeedbackType]));
  }

  public addComment(reviewID : number, contenuto : string, username: string) : Observable<number>
  {
    return this.httpClient.post<number>("http://localhost:8080/addComment", {
        contenuto: contenuto,
        recensione: reviewID,
        utente: username
      });
  }

  public editComment(commentID : number, contenuto : string, username: string) : Observable<number>
  {
    return this.httpClient.post<number>("http://localhost:8080/editComment", {
      id: commentID,
      contenuto: contenuto,
      utente: username
    });
  }

  public deleteComment(commentID : number) : Observable<boolean>
  {
    return this.httpClient.delete<boolean>("http://localhost:8080/deleteComment/" + commentID);
  }
}
export interface Comment {
  id: number;
  utente: string;
  contenuto : string;
  numeroMiPiace: number;
  numeroNonMiPiace: number;
  data: string;
}



