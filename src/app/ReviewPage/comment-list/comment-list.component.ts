import {Component, Input, SimpleChanges} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FeedbackType} from 'src/app/enum';
import {Utente} from 'src/app/interfaces';
import {Comment, CommentService} from 'src/app/services/comment.service';
import {ObserverStatus} from 'src/app/utils/observer';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  //the comments inside the review
  comments: Comment[] = [];
  loadedTimes : number = 0;
  newCommentFormControl = new FormControl("", [Validators.required]);
  @Input() loggedUser ?: Utente;
  @Input() reviewId ?: number;
  @Input() jsessionid ?: string;

  allCommentsLoaded = false;


  constructor(private commentS: CommentService){}

  ngOnChanges(changes: SimpleChanges) {

    this.comments = []
    this.loadedTimes = 0


    if(this.loggedUser !== undefined && this.reviewId !== undefined)
    {
      this.loadNewComments();
    }
  }

  loadCommentsStatus = new ObserverStatus();

  loadNewComments()
  {
    if(this.allCommentsLoaded) return;

    this.loadCommentsStatus.call(this.commentS.getComments(this.reviewId!, this.loadedTimes * 10, 10, this.jsessionid), (newComments) =>
    {
      this.comments = this.comments.concat(newComments);
      this.loadedTimes += 1;
      if(newComments.length == 0)
        this.allCommentsLoaded = true;
    });
  }


  addCommentStatus = new ObserverStatus();

  addComment()
  {
    if(this.loggedUser === undefined || this.reviewId === undefined)
      return;

    this.addCommentStatus.call(this.commentS.addComment(this.reviewId, this.newCommentFormControl.value!, this.loggedUser.username), (commentID) =>
    {
        this.comments.unshift({
          contenuto: this.newCommentFormControl.value!,
          id: commentID,
          numeroMiPiace: 0,
          numeroNonMiPiace: 0,
          utente: this.loggedUser?.username!,
          data: new Date().toISOString(),
          currentFeedback: FeedbackType.none})
        this.newCommentFormControl.reset();
    });

  }
  deleteCommentStatus = new ObserverStatus();
  deleteComment(comment : Comment)
  {
    this.deleteCommentStatus.call(this.commentS.deleteComment(comment.id), () =>
    {
      this.comments = this.comments.filter(val => val.id !== comment.id);
    });

  }

}
