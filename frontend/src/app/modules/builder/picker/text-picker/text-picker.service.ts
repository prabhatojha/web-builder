import { Injectable } from '@angular/core';
import { FontFamilyService } from 'src/app/modules/shared/services/font/font-family.service';
import { TextPickerModel } from 'src/app/models/text.picker.model';
import { getTextPickerInstance, TextPickerTypes } from './text-picker.config';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';

@Injectable({
  providedIn: 'root'
})
export class TextPickerService {
  list: TextPickerModel[] = [];
  customTextFonts = [
    {
      family: 'Sriracha',
      url: 'http://fonts.gstatic.com/s/rajdhani/v9/LDIxapCSOBg7S-QT7q4AOeekWPrP.ttf',
      fontSize: '35px',
      innerText: 'Enter Text'
    },
    {
      family: 'Metal Mania',
      url: 'http://fonts.gstatic.com/s/metalmania/v9/RWmMoKWb4e8kqMfBUdPFJeXCg6UKDXlq.ttf',
      fontSize: '30px',
      innerText: 'Enter Text'
    },
    {
      family: 'Piedra',
      url: 'http://fonts.gstatic.com/s/piedra/v8/ke8kOg8aN0Bn7hTunEyHN_M3gA.ttf',
      fontSize: '30px',
      innerText: 'Enter Text'
    },
    {
      family: 'Odibee Sans',
      url: 'http://fonts.gstatic.com/s/odibeesans/v1/neIPzCSooYAho6WvjeToRYkyepH9qGsf.ttf',
      fontSize: '30px',
      innerText: 'Enter Text'
    },
    {
      family: 'Staatliches',
      url: 'http://fonts.gstatic.com/s/staatliches/v3/HI_OiY8KO6hCsQSoAPmtMbectJG9O9PS.ttf',
      fontSize: '30px',
      innerText: 'Enter Text'
    },
    {
      family: 'Lexend Tera',
      url: 'http://fonts.gstatic.com/s/lexendtera/v1/RrQUbo98_jt_IXnBPwCWtZhARYMgGtWA.ttf',
      fontSize: '30px',
      innerText: 'Enter Text'
    }
  ];
  constructor(private fontService: FontFamilyService) {
    this.init();
  }

  init() {

    this.buildImageTypeText();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.fontService.customTextFonts.length; i++) {
      this.buildTextPickerItem(this.fontService.customTextFonts[i]);
    }
  }

  buildImageTypeText() {
    const picker = getTextPickerInstance();
    picker.type = TextPickerTypes.IMAGE;
    picker.imageUrl = '/assets/images/pickers/add-text.png';
    picker.canvaElement.children[0].innerText = 'Double click to edit';
    this.list.push(picker);
  }

  buildTextPickerItem(item) {
    const picker = getTextPickerInstance();
    picker.fontSize = item.fontSize;
    picker.fontFamily = item.family;
    picker.type = TextPickerTypes.TEXT;
    picker.innerText = item.innerText; // Picker element text
    picker.canvaElement.children[0].innerText = 'Double click to edit'; // Canvas element text
    picker.canvaElement.style[CSS_PROPERTIES.FONT_FAMILY] = item.family;

    this.list.push(picker);

  }
}
