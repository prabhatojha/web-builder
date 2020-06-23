import { Component, OnInit } from '@angular/core';
import { PICKERS } from '../picker.mock';
import { TextPickerTypes } from './text-picker.config';
import { CONST_VAR } from 'src/app/constants/contants';
import { TextPickerService } from './text-picker.service';

@Component({
  selector: 'app-text-picker',
  templateUrl: './text-picker.component.html',
  styleUrls: ['./text-picker.component.scss']
})
export class TextPickerComponent implements OnInit {

  TextPickerTypes = TextPickerTypes;
  constructor(public textPickerService: TextPickerService) { }
  items = [];

  ngOnInit(): void {
    this.getInitialImages();
  }


  getInitialImages() {
    // this.items = PICKERS[LEFT_MENU_CONST.TEXT_MENU_ID];
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
