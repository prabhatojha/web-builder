import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent implements OnInit, OnChanges {

  @Input() list = [];
  @Input() changeFontFamily = false;

  @Output() itemSelect = new EventEmitter();
  @Output() itemHover = new EventEmitter();
  @Output() closeWithoutSelect = new EventEmitter();

  showList = false;
  searchStr = '';
  searching = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  openDropdown() {
    this.searching = false;
    this.showList = true;
  }

  search(value) {
    this.searching = true;
    this.searchStr = value;
  }

  doesStringContains(label) {
    return label.toLowerCase().includes(this.searchStr);
  }

  closeDropdown() {
    this.showList = false;
  }

  onClickOutside() {
    this.closeWithoutSelect.emit();
    this.closeDropdown();
  }

  selectItem(opt) {
    this.itemSelect.emit(opt);
    this.closeDropdown();
  }

  updateSearch(e) {
  }

  hoverItem(opt) {
    this.itemHover.emit(opt);
  }
}
