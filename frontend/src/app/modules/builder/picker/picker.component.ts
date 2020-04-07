import { Component, OnInit, Input, HostListener, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit, OnChanges {

  @Input() picker;
  @Output() closePicker = new EventEmitter<any>();

  items = [{
    tag: 'div',
    text: null,
    children: [],
    style: {
      width: '100%',
      height: '100%',
      border: '1px solid grey'
    }
  }];
  constructor() { }

  @HostListener('document:keydown.esc')
  onEsc() {
    this.closePicker.emit();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.picker && this.picker) {
      this.loadItems();
    }
  }

  loadItems() {

  }

}
