import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickers',
  templateUrl: './pickers.component.html',
  styleUrls: ['./pickers.component.scss']
})
export class PickersComponent implements OnInit {
  items = [
    {
      id: 1,
      label: 'Containers'
    },
    {
      id: 2,
      label: 'Text'
    },
    {
      id: 3,
      label: 'Button'
    },
    {
      id: 4,
      label: 'Link'
    },
    {
      id: 5,
      label: 'Image'
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
