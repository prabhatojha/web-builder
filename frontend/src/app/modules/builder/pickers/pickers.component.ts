import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pickers',
  templateUrl: './pickers.component.html',
  styleUrls: ['./pickers.component.scss']
})
export class PickersComponent implements OnInit {
  items = [
    {
      id: 2,
      label: 'Text',
      icon: 'text_fields'
    },
    {
      id: 5,
      label: 'Photo',
      icon: 'image_search'
    },
    {
      id: 6,
      label: 'Upload',
      icon: 'cloud_upload'
    }
  ];

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
