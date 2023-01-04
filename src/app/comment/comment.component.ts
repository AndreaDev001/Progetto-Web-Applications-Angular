import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ObserverStatus } from '../utils/observer';
import { Comment, CommentService, FeedbackType } from './comment.service'


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})



export class CommentComponent implements OnInit{


  public FeedbackTypeEnum = FeedbackType;

  constructor(private service : CommentService){}


  @Input() comment!: Comment;
  @Input() loggedUser?: string;
  @Output() onDelete = new EventEmitter<Comment>();
  currentFeedback : FeedbackType = FeedbackType.none;
  editMode: boolean = false;
  isUpdatingFeedback: boolean = false;

  commentTextControl = new FormControl("", [Validators.required]);


  ngOnInit(): void {

    if(this.loggedUser !== this.comment.utente)
      return;
    console.log("EEEIEIEIIEEIIE");
    this.service.getCommentFeedback(this.comment.id).subscribe(feedback => {
      this.currentFeedback = feedback;
      console.log(feedback);
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

      this.isUpdatingFeedback = true;
      this.service.changeFeedback(this.comment.id, feedback == FeedbackType.like).subscribe(feedback =>
        {
          let resultFeedback = FeedbackType[feedback as keyof typeof FeedbackType]
          this.isUpdatingFeedback = false;
          this.updateFeedbackCount(resultFeedback, true);
          this.updateFeedbackCount(this.currentFeedback, false);
          this.currentFeedback = resultFeedback;

      });
  }

  resize(element : any) {
    console.log(element);
    element.style.height = "0px";
    element.style.height = (element.scrollHeight + 10)+"px";

    console.log(this.comment.contenuto);
  }

  editStatus = new ObserverStatus();

  editComment()
  {
    this.editStatus.call(this.service.editComment(this.comment.id, this.commentTextControl.value!), () =>
    {
      this.comment.contenuto = this.commentTextControl.value!;
      this.setEditMode(false);
    });
  }
}
