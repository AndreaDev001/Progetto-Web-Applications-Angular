import {Component, EventEmitter, Input, Output} from '@angular/core';


import {faThumbsDown, faThumbsUp, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {EMPTY} from 'rxjs';
import {FeedbackType} from 'src/app/enum';
import {FeedbackContainer, FeedbackStrategy} from 'src/app/interfaces';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent{

  public FeedbackTypeEnum = FeedbackType;
  public icons: IconDefinition[] = [faThumbsUp,faThumbsDown];
  loading : boolean = false;

  @Input() feedback : FeedbackContainer = {currentFeedback: FeedbackType.none, numeroMiPiace: 0, numeroNonMiPiace: 0};
  @Output() feedbackChange = new EventEmitter<FeedbackContainer>();
  @Input() disabled : boolean = false;
  @Input() target : FeedbackStrategy = {onFeedbackChange: () => { return EMPTY; }};

  private updateFeedbackCount(feedback : FeedbackType, increase : boolean)
  {
    if(feedback === FeedbackType.like)
      this.feedback.numeroMiPiace += increase ? 1 : -1;
    else if(feedback === FeedbackType.dislike)
      this.feedback.numeroNonMiPiace += increase ? 1 : -1;
  }

  public updateFeedback(type : FeedbackType)
  {
    const observable = this.target.onFeedbackChange(type);
    if(observable == EMPTY) return;

    this.loading = true;
    this.target.onFeedbackChange(type).subscribe(newFeedback  => {
      this.loading = false;
      this.updateFeedbackCount(newFeedback, true);
      this.updateFeedbackCount(this.feedback.currentFeedback, false);
      this.feedback.currentFeedback = newFeedback;
      this.feedbackChange.emit(this.feedback);
    })

  }

}
