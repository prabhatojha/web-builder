import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() list = [];
  @Input() changeFontFamily = false;
  @Input() disabled = false;

  @Output() itemSelect = new EventEmitter();
  @Output() itemHover = new EventEmitter();
  @Output() closeWithoutSelect = new EventEmitter();

  @ViewChild('inputContainer') inputContainer;
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  showList = false;
  searchStr = '';
  searching = false;
  dropdownWidth = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dropdownWidth = this.inputContainer.nativeElement.offsetWidth + 'px';
    console.log(this.inputContainer.nativeElement, this.dropdownWidth);
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
