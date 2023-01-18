import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-message-pop-up',
  templateUrl: './message-pop-up.component.html',
  styleUrls: ['./message-pop-up.component.css']
})
export class MessagePopUpComponent implements OnInit{
  @Input() name?: string;
  @Input() text?: string;
  @Input() buttonText?: string;
  @ViewChild("content") content?: any;

  constructor(private modalService: NgbModal) {

  }
  public ngOnInit(): void{

  }
  public open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
