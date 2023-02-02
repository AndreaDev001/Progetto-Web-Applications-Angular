import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ObserverStatus } from '../../utils/observer';
import { Comment, CommentService } from '../../services/comment.service'
import { FeedbackType } from "../../enum";
import { FeedbackStrategy, Utente } from 'src/app/interfaces';
import { FeedbackComponent } from '../feedback/feedback.component';
import { EMPTY, Observable } from 'rxjs';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})



export class CommentComponent implements FeedbackStrategy{


  constructor(private service : CommentService, private alertService : AlertHandlerService){}


  @Input() comment!: Comment;
  @Input() loggedUser?: Utente;
  @Output() onDelete = new EventEmitter<Comment>();
  editMode: boolean = false;

  commentTextControl = new FormControl("", [Validators.required]);

  setEditMode(editMode : boolean)
  {
    this.editMode = editMode;
    if(!this.editMode)
      this.commentTextControl.setValue(this.comment.contenuto);
  }

  public onFeedbackChange(feedback : FeedbackType) : Observable<FeedbackType>
  {
    if(this.loggedUser === undefined || this.loggedUser === null)
      return EMPTY;

    return this.service.changeFeedback(this.comment.id, feedback === FeedbackType.like, this.loggedUser.username);
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


  deleteComment()
  {
    this.alertService.resetOptions();
    this.alertService.addOption({name: "CANCEL",callback: () => {}});
    this.alertService.addOption({name: "CONFIRM",className: "button btn button-danger",callback: () => {
      this.onDelete.emit(this.comment);
    }});
    this.alertService.setAllValues("Delete Comment", "Are you sure to delete this comment?",  true);
  }
}
