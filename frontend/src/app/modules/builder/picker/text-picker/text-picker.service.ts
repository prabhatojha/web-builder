import { Injectable } from '@angular/core';
import { FontFamilyService } from 'src/app/modules/shared/services/font/font-family.service';
import { TextPickerModel, TextPickerTypes } from 'src/app/models/text.picker.model';
import { getTextPickerInstance } from './text-picker.config';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';

@Injectable({
  providedIn: 'root'
})
export class TextPickerService {
  list: TextPickerModel[] = [];

  constructor(private fontService: FontFamilyService) {
    this.init();
  }

  init() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < 2; i++) {
      this.buildTextPickerItem(this.fontService.customTextFonts[i]);
    }

    // this.buildImageTypeText();
  }

  buildImageTypeText() {
    const picker = getTextPickerInstance();
    picker.type = TextPickerTypes.IMAGE;
    picker.imageUrl = '/assets/images/pickers/add-text.png';
    picker.canvasElement.children[0].innerText = 'Double click to edit';
    this.list.push(picker);
  }

  buildTextPickerItem(item) {
    const picker = getTextPickerInstance();
    picker.fontSize = item.fontSize;
    picker.fontFamily = item.family;
    picker.type = TextPickerTypes.TEXT;
    picker.innerText = item.innerText; // Picker element text
    picker.canvasElement.children[0].innerText = 'Double click to edit'; // Canvas element text
    picker.canvasElement.style[CSS_PROPERTIES.FONT_FAMILY] = item.family;
    this.list.push(picker);

  }
}
