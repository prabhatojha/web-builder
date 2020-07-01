import { Component, OnInit } from '@angular/core';
import { LEFT_MENU_ITEMS } from '../picker/picker.config';

@Component({
  selector: 'app-pickers',
  templateUrl: './pickers.component.html',
  styleUrls: ['./pickers.component.scss']
})
export class PickersComponent implements OnInit {
  items = LEFT_MENU_ITEMS;

  selectedItemIndex: number;
  showPicker = false;

  selectedPicker = null;
  constructor() { }

  ngOnInit(): void {
  }

  selectPicker(item, index) {
    this.showPicker = true;
    if (this.selectedItemIndex !== index) {
      this.selectedItemIndex = index;
      this.selectedPicker = item;
    }
  }
}
