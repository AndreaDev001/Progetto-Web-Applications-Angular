import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ObserverStatus } from '../../utils/observer';
import { Comment, CommentService } from '../../services/comment.service'
import { FeedbackType } from "../../enum";
import { Utente } from 'src/app/interfaces';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})



export class CommentComponent implements OnInit{


  public FeedbackTypeEnum = FeedbackType;

  constructor(private service : CommentService){}


  @Input() comment!: Comment;
  @Input() loggedUser?: Utente;
  @Output() onDelete = new EventEmitter<Comment>();
  currentFeedback : FeedbackType = FeedbackType.none;
  editMode: boolean = false;
  isUpdatingFeedback: boolean = false;

  commentTextControl = new FormControl("", [Validators.required]);


  ngOnInit(): void {

    if(this.loggedUser?.username !== this.comment.utente)
      return;
    this.service.getCommentFeedback(this.comment.id).subscribe(feedback => {
      this.currentFeedback = feedback;
    });


  }

  setEditMode(editMode : boolean)
  {
    this.editMode = editMode;
    if(!this.editMode)
      this.commentTextControl.setValue(this.comment.contenuto);
  }


  private updateFeedbackCount(feedback : FeedbackType, increase : boolean)
  {
    if(feedback === FeedbackType.like)
      this.comment.numeroMiPiace += increase ? 1 : -1;
    else if(feedback === FeedbackType.dislike)
      this.comment.numeroNonMiPiace += increase ? 1 : -1;
  }

  changeFeedback(feedback : FeedbackType)
  {
    if(this.loggedUser === null || this.loggedUser === undefined)
    {
      window.open('http://localhost:8080/login', '_blank');
      return;
    }
    this.isUpdatingFeedback = true;
    this.service.changeFeedback(this.comment.id, feedback == FeedbackType.like, this.loggedUser.username).subscribe(feedback =>
      {
        let resultFeedback = FeedbackType[feedback as keyof typeof FeedbackType]
        this.isUpdatingFeedback = false;
        this.updateFeedbackCount(resultFeedback, true);
        this.updateFeedbackCount(this.currentFeedback, false);
        this.currentFeedback = resultFeedback;

    });
  }

  editStatus = new ObserverStatus();

  editComment()
  {
    if(this.loggedUser === undefined)
      return;
    this.editStatus.call(this.service.editComment(this.comment.id, this.commentTextControl.value!, this.loggedUser.username), () =>
    {
      this.comment.contenuto = this.commentTextControl.value!;
      this.setEditMode(false);
    });
  }

  public getFormattedDate() : string
  {
    return new Date(this.comment.data).toLocaleString();
  }
}
