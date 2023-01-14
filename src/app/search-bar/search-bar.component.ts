import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{
  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchField: new FormControl('', Validators.required)
    });
  }
}
