import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PICKERS } from '../picker.mock';
import { LEFT_MENU_CONST } from '../picker.config';
import { CONST_VAR } from 'src/app/constants/contants';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit, OnChanges {

  items = [];

  constructor() { }

  ngOnInit() {
    this.getInitialImages();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getInitialImages() {
    this.items = PICKERS[LEFT_MENU_CONST.PHOTO_MENU_ID];
  }

  dragStart(ev, item) {
    const bound = ev.target.getBoundingClientRect();

    ev.dataTransfer.setData(CONST_VAR.PICKER_ITEM,
      JSON.stringify({
        left: ev.clientX - bound.left,
        top: ev.clientY - bound.top,
        item
      }));
  }
}
