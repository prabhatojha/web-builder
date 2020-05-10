import { Component, OnInit } from '@angular/core';

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

  selectedPicker = null;
  constructor() { }

  ngOnInit(): void {
  }

  selectPicker(item) {
    this.selectedPicker = item;
  }

}
