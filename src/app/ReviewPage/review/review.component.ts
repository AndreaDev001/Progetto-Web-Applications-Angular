import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Editor, Toolbar} from 'ngx-editor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validators as NGXValidators } from 'ngx-editor'
import { DomSanitizer } from '@angular/platform-browser';
import { Comment, CommentService } from '../../services/comment.service';
import { ReviewService } from '../../services/review.service';
import { Review, Utente } from '../../interfaces';
import { ObserverStatus } from '../../utils/observer';
import { SpringHandlerService } from 'src/app/services/spring-handler.service';
import { HttpParams } from '@angular/common/http';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy  {
  //this tells if the user is editing the review or not
  isEditMode: boolean = false;

  //the comments inside the review
  comments: Comment[] = [];
  loadedTimes : number = 0;

  loggedUser ?: Utente;

  review: Review = {titolo: "", contenuto:"", voto: 0};
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
        console.log(this.review);
      }
      this.springService.getGame(this.review.gioco!).subscribe(result => {
        this.game.image = result.immagine;
        this.game.title = result.titolo;
      });

    });
  }

  isNewReview() : boolean
  {
    return this.review.id === undefined;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
    if(this.loggedUser?.username === null)
    {
      this.alertService.setAllValues("Publish Error", "You are not logged in", "Ok", true);
      return;
    }

    this.review.utente = this.loggedUser?.username;

    this.publishReviewStatus.call(this.reviewS.publish({...this.review, ...<Review>this.form.value}), (reviewID) =>
    {
      this.router.navigate(["/recensioni", reviewID], {queryParams: {jsessionid: this.springService.getSessionID(true)}});
    }, (error) => {
      this.alertService.setAllValues("Publish Error", "Something went wrong, retry later", "Ok", true);
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
        this.comments.unshift({contenuto: this.newCommentFormControl.value!, id: commentID, numeroMiPiace: 0, numeroNonMiPiace: 0, utente: this.loggedUser?.username!, data: new Date().toISOString()})
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
