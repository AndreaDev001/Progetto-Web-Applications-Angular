import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {
  count = 0;
  visibility: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    this.visibility = new BehaviorSubject(false);
    router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd && router.url.split("?")[0] == "/news")
        this.count = 0;
    })
  }

  show() {
    this.visibility.next(true);
    this.count++;
  }
  hide() {
    this.count--;
    if (this.count < 1) {
      this.visibility.next(false);
    }
  }
}
