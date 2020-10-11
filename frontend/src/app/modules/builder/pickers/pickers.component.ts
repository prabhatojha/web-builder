import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppAnimations } from 'src/style/_angular-animations';
import { LEFT_MENU_ITEMS } from '../picker/picker.config';

@Component({
  selector: 'app-pickers',
  templateUrl: './pickers.component.html',
  styleUrls: ['./pickers.component.scss'],
  animations: [AppAnimations.SlideRight]
})
export class PickersComponent implements OnInit {
  @Output() pickerVisible = new EventEmitter();
  items = LEFT_MENU_ITEMS;

  selectedItemIndex: number;
  showPicker = false;

  selectedPicker = null;
  constructor() { }

  ngOnInit(): void {
  }

  selectPicker(item, index) {
    this.showPicker = true;
    this.pickerVisible.emit(this.showPicker);
    if (this.selectedItemIndex !== index) {
      this.selectedItemIndex = index;
      this.selectedPicker = item;
    }
  }

  closePicker() {
    this.showPicker = false;
    this.pickerVisible.emit(this.showPicker);
  }
}
