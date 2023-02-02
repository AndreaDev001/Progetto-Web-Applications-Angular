import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { FeedbackType } from '../enum';
import { FeedbackContainer, Utente } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  public getComments(reviewID : number, startIndex : number, size : number, jsessionid ?: string) : Observable<Comment[]>
  {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("reviewID", reviewID);
      queryParams = queryParams.append("startIndex", startIndex);
      queryParams = queryParams.append("commentsSize", size);
      if(jsessionid !== undefined)
        queryParams = queryParams.append("jsessionid", jsessionid);
      return this.httpClient.get("http://localhost:8080/getComments", {params: queryParams}).pipe(map((result : any) => {
        const comments : Comment[] = [];
        result.forEach((element: any) => {
          comments.push({...element.comment, currentFeedback: FeedbackType[element.feedback as keyof typeof FeedbackType]})
        });
        return comments;
      }));
  }

  public changeFeedback(commentID: number, isLike : boolean, username: string) : Observable<FeedbackType>
  {
      return this.httpClient.post<string>("http://localhost:8080/changeFeedback", {
        commento: commentID,
        tipo: isLike,
        utente: username
      }, {responseType: 'text' as any}).pipe(map(value => FeedbackType[value as keyof typeof FeedbackType]));
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
export interface Comment extends FeedbackContainer {
  id: number;
  utente: string;
  contenuto : string;
  data: string;
}



