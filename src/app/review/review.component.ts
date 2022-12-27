import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Editor, Toolbar, Validators} from 'ngx-editor';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Comment, CommentService, FeedbackType } from '../comment/comment.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {
  isEditMode: boolean = false;
  isNewReview: boolean = false;
  loading: boolean = false;
  comments: Comment[] = [];
  loadedTimes : number = 0;
  html = '';
  oldHtml = this.html;
  editorr!: Editor;
  public FeedbackTypeEnum = FeedbackType;

  loadingComments : boolean = false;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', [Validators.minLength(50), Validators.required()]),
  });


  ngOnDestroy(): void {
    this.editorr.destroy();
  }

  constructor (private service: CommentService, private route: ActivatedRoute, private router: Router,private location: Location, public sanitizer: DomSanitizer){
  }
  ngOnInit(): void {

    this.editorr = new Editor();
    this.editorr.view.editable = false;
    this.route.data.subscribe(data => {
      this.isNewReview = data["isNewReview"];
      this.setEditMode(this.isNewReview);
    });

  }

  setEditMode(canEdit: boolean)
  {
    this.isEditMode = canEdit;
    if(!this.isEditMode)
      this.html = this.oldHtml;
  }

  publishReview(id: number)
  {
    const url = this.router.createUrlTree(["../../recensioni/" + id], {relativeTo: this.route}).toString();
    //is is to give the illusion of loading a new page by changing url dynamically
    this.loading = true;
    setTimeout(() => {

      this.oldHtml = this.html;
      this.location.go(url);
      this.setEditMode(false);
      this.isNewReview = false;
      this.loading = false;


    },1000);

  }

  loadNewComments()
  {

    if(!this.isNewReview)
    {
      this.loadingComments = true;
      this.service.getComments(2, this.loadedTimes * 10, 10).subscribe(newComments => {
        //console.log(newComments);
        if(newComments.length > 0)
        {
          this.comments = this.comments.concat(newComments);
          this.loadedTimes += 1;
        }
        this.loadingComments = false;
      });
    }
  }
}
