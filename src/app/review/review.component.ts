import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Editor, Toolbar} from 'ngx-editor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validators as NGXValidators } from 'ngx-editor'
import { DomSanitizer } from '@angular/platform-browser';
import { Comment, CommentService } from '../comment/comment.service';
import { Review, ReviewService } from './review.service';
import { ObserverStatus } from '../utils/observer';

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

  loggedUser ?: string = "pier";

  review: Review = {titolo: "", contenuto:"", voto: 0};
  //the editor instance
  editor!: Editor;
  votes : number[] = [0,1,2,3,4,5,6,7,8,9,10];

  newCommentFormControl = new FormControl("", [Validators.required]);

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

  constructor (private commentS: CommentService, private reviewS : ReviewService, private route: ActivatedRoute, private router: Router,private location: Location, public sanitizer: DomSanitizer){
  }

  ngOnInit(): void {
    //check by reading the route date if this is a new review to be published

    this.editor = new Editor();
    this.route.data.subscribe(data => {

      if(data["review"] === undefined)
        this.setEditMode(true);
      else
        this.review = data["review"];
      this.loadNewComments();
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
    this.publishReviewStatus.call(this.reviewS.publish({...this.review, ...<Review>this.form.value}), (reviewID) =>
    {
      this.router.navigate(["/recensioni", reviewID]);
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
    if(this.isNewReview())
      return;

    this.addCommentStatus.call(this.commentS.addComment(this.review.id!, this.newCommentFormControl.value!), (commentID) =>
    {
        this.comments.unshift({contenuto: this.newCommentFormControl.value!, id: commentID, numeroMiPiace: 0, numeroNonMiPiace: 0, utente: this.loggedUser!})
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
