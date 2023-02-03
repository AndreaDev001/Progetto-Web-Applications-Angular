import {Component, HostListener, OnInit} from '@angular/core';
import {NgbOffcanvas, OffcanvasDismissReasons} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-offcanvas-side-bar',
  templateUrl: './offcanvas-side-bar.component.html',
  styleUrls: ['./offcanvas-side-bar.component.css']
})
export class OffcanvasSideBarComponent implements OnInit{
  private element?: HTMLElement | null;
  private closeResult = '';

  constructor(private offcanvasService: NgbOffcanvas) {

  }
  public ngOnInit() {
    this.element = document.querySelector("offCanvas");
  }
  public open(content: any) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    const size = event.target.innerWidth;
    if(size >= 768)
      this.offcanvasService.dismiss(OffcanvasDismissReasons.ESC);
  }
}
