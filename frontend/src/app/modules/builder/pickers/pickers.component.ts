import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickers',
  templateUrl: './pickers.component.html',
  styleUrls: ['./pickers.component.scss']
})
export class PickersComponent implements OnInit {
  items = [
    {
      id: 1234,
      label: 'Containers'
    },
    {
      id: 1234,
      label: 'Text'
    },
    {
      id: 1234,
      label: 'Button'
    },
    {
      id: 1234,
      label: 'Link'
    },
    {
      id: 1234,
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
