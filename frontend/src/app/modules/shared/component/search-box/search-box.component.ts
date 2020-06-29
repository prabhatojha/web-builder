import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() placeholder = 'Search';
  @Input() minQueryLength = 2;
  @Input() value = '';

  @Output() searchQuery = new EventEmitter();
  @Output() searchValueChange = new EventEmitter();

  query = '';

  constructor() { }

  ngOnInit(): void {
  }

  doSearch() {
    if (this.query.length >= this.minQueryLength) {
      this.searchQuery.emit(this.query);
    }
  }

  onChange() {
    console.log('ng On change', this.query, this.minQueryLength);
    if (this.query.length >= this.minQueryLength) {
      this.searchValueChange.emit(this.query.toLowerCase());
    }
  }

}
