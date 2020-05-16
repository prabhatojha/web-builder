import { Component, OnInit } from '@angular/core';
import { LEFT_MENU_ITEMS } from '../picker/picker.mock';

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
    // this.selectedPicker = item;
    // this.showPicker = !this.showPicker;
    // this.selectedItemIndex = index;
    if (this.selectedItemIndex === index) {
      this.showPicker = false;
      this.selectedItemIndex = -1;
    } else {
      this.selectedItemIndex = index;
      this.selectedPicker = item;
      this.showPicker = true;
    }
  }

}
