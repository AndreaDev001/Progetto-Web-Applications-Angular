import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Editor, Toolbar} from 'ngx-editor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validators as NGXValidators } from 'ngx-editor'
import { DomSanitizer } from '@angular/platform-browser';
import { Comment, CommentService } from '../../services/comment.service';
import { ReviewService } from '../../services/review.service';
import { FeedbackStrategy, Review, Utente } from '../../interfaces';
import { ObserverStatus } from '../../utils/observer';
import { SpringHandlerService } from 'src/app/services/spring-handler.service';
import { HttpParams } from '@angular/common/http';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { FeedbackType } from 'src/app/enum';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy, FeedbackStrategy  {
  //this tells if the user is editing the review or not
  isEditMode: boolean = false;

  //the comments inside the review
  comments: Comment[] = [];
  loadedTimes : number = 0;

  loggedUser ?: Utente;

  review: Review = {titolo: "", contenuto:"", voto: 0, currentFeedback: FeedbackType.none, numeroMiPiace: 0, numeroNonMiPiace: 0};
  //the editor instance
  editor!: Editor;
  votes : number[] = [0,1,2,3,4,5,6,7,8,9,10];

  newCommentFormControl = new FormControl("", [Validators.required]);

  backgroundImage = '';
  game : {image : string, title: string} = {image: "", title: ""};

  //toolbar configuration used inside the html editor
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  //controls applied inside the review editor
  form = new FormGroup({
    contenuto: new FormControl("", [NGXValidators.minLength(50), NGXValidators.required()]),
    titolo: new FormControl("", [Validators.required]),
    voto: new FormControl(0, [Validators.required]),
  });

  constructor (private commentS: CommentService, private reviewS : ReviewService, private route: ActivatedRoute, private router: Router,private location: Location, public sanitizer: DomSanitizer, public springService: SpringHandlerService, private alertService: AlertHandlerService){
  }

  ngOnInit(): void {


    this.springService.getCurrentUsername(false).subscribe((value: Utente | undefined) => {
      this.loggedUser = value;
    });

    this.editor = new Editor();
    this.route.data.subscribe(data => {
      //check by reading the route date if this is a new review to be published
      if(data["review"] === undefined)
      {
        this.setEditMode(true);
        const gameID = this.route.snapshot.paramMap.get("gameID");
        if(gameID !== null)
          this.review.gioco = parseInt(gameID);
      }
      else
      {
        this.review = data["review"];
        this.loadNewComments();
      }
      this.springService.getGame(this.review.gioco!).subscribe(result => {
        this.game.image = result.immagine;
        this.game.title = result.titolo;
      });

    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }


  isNewReview() : boolean
  {
    return this.review.id === undefined;
  }

  setEditMode(canEdit: boolean)
  {
    this.isEditMode = canEdit;
    if(canEdit)
    {
      this.form.reset();
      this.form.controls.titolo.setValue(this.review.titolo);
      this.form.controls.contenuto.setValue(this.review.contenuto);
      this.form.controls.voto.setValue(this.review.voto);

    }
  }

  publishReviewStatus = new ObserverStatus();

  //called when a new review is published
  publishReview()
  {
    if(this.loggedUser === null || this.loggedUser === undefined)
    {
      this.alertService.setAllValues("Publish Error", "You are not logged in", true);
      return;
    }

    this.review.utente = this.loggedUser?.username;

    this.publishReviewStatus.call(this.reviewS.publish({...this.review, ...<Review>this.form.value}), (reviewID) =>
    {
      this.router.navigate(["/recensioni", reviewID], {queryParams: {jsessionid: this.springService.getSessionID(true)}});
    }, (error) => {
      this.alertService.setAllValues("Publish Error", "Something went wrong, retry later", true);
    });

  }

  //called when a review is edited
  editReview()
  {
    const reviewSubmit = {...this.review, ...<Review>this.form.value};
    this.publishReviewStatus.call(this.reviewS.edit(reviewSubmit), (result) => {
        this.setEditMode(false);
        this.review = reviewSubmit;
    });
  }

  reportReviewStatus = new ObserverStatus();
  reportReview()
  {
    if(this.loggedUser === null || this.loggedUser === undefined)
    {
      this.alertService.setAllValues("Report Error", "You are not logged in", true);
      return;
    }
    this.reportReviewStatus.call(this.reviewS.report(this.review, this.loggedUser.username, "ee"), (result) =>
    {
      this.alertService.setAllValues("Report Status", "Report submitted successfully", true);
    }, (error) => {
      if(error.error.sqlError)
        this.alertService.setAllValues("Report Status", "Review is already reported", true);
      else
        this.alertService.setAllValues("Report Status", "Review Report failed, retry later", true);
    });
  }

  deleteReviewStatus = new ObserverStatus();

  deleteReviewPrompt()
  {
    this.alertService.resetOptions();
    this.alertService.addOption({name: "CANCEL",callback: () => {}});
    this.alertService.addOption({name: "CONFIRM",className: "button btn button-danger", callback: () => {
      if(this.loggedUser === null || this.loggedUser === undefined)
        return;

      this.reportReviewStatus.call(this.reviewS.delete(this.review), (result) =>
      {
        this.alertService.resetOptions();
        this.alertService.addOption({name: "CONFIRM",callback: () => { this.router.navigate(["/"], {queryParams: {jsessionid: this.springService.getSessionID(true)}})}});
        this.alertService.setAllValues("Delete Review", "Review deleted successfully",  true);
      });
    }});
    this.alertService.setAllValues("Delete Review", "Are you sure to delete this review? (It cannot be undone)",  true);
  }


  public onFeedbackChange(feedback : FeedbackType) : Observable<FeedbackType>
  {
    if(this.review.id === undefined || this.loggedUser === undefined || this.loggedUser === null)
      return EMPTY;

    return this.reviewS.changeFeedback(this.review.id, feedback === FeedbackType.like, this.loggedUser.username);
  }

  public getInitialFeedback() : Observable<FeedbackType>
  {
    if(this.review.id === undefined || this.loggedUser === undefined)
      return EMPTY;
    console.log("TRY GET FEEDBACK");
    return this.reviewS.getFeedback(this.loggedUser?.username, this.review.id);
  }

  //COMMENT SECTION

  loadCommentsStatus = new ObserverStatus();

  loadNewComments()
  {
    this.loadCommentsStatus.call(this.commentS.getComments(this.review.id!, this.loadedTimes * 10, 10), (newComments) =>
    {
      this.comments = this.comments.concat(newComments);
      this.loadedTimes += 1;
    });
  }


  addCommentStatus = new ObserverStatus();

  addComment()
  {
    if(this.loggedUser === undefined)
      return;

    this.addCommentStatus.call(this.commentS.addComment(this.review.id!, this.newCommentFormControl.value!, this.loggedUser.username), (commentID) =>
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
