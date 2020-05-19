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
  showList = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  openDropdown() {
    this.showList = true;
  }

  closeDropdown() {
    this.showList = false;
  }

  selectItem(opt) {
    this.itemSelect.emit(opt);
    this.closeDropdown();
  }

  hoverItem(opt) {
    this.itemHover.emit(opt);
  }
}
