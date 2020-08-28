import { Injectable } from '@angular/core';
import { FontFamilyService } from 'src/app/modules/shared/services/font/font-family.service';
import { TextPickerModel, TextPickerTypes } from 'src/app/models/text.picker.model';
import { getTextPickerInstance } from './text-picker.config';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { CanvasElement } from 'src/app/models/canvas.element.model';

@Injectable({
  providedIn: 'root'
})
export class TextPickerService {
  list: TextPickerModel[] = [];
  tempp = [
    {
      'resizable': false,
      'increaseZIndex': true,
      'tag': 'div',
      'attribute': {},
      'style': {
        'font-size': '49px',
        'font-family': 'Bebas Neue',
        'text-align': 'center',
        'position': 'absolute',
        'user-select': 'none',
        'width': '158px',
        'letter-spacing': '11px',
        'transform': 'matrix(1.74,0,0,1.74,171.04,44.01) translate(0px, 41.09195402298849px)',
        'z-index': 20
      },
      'children': [
        {
          'resizable': true,
          'increaseZIndex': true,
          'tag': 'label',
          'attribute': {
            'class': 'users-editable-content'
          },
          'style': {
            'outline': 'none',
            'width': '100%'
          },
          'children': [],
          'innerText': 'CALVIN'
        }
      ],
      'type': 4,
      'dimention': {
        'width': 320,
        'height': 40,
        'rotate': 0,
        'translateX': 0,
        'translateY': 0,
        'scaleX': 1,
        'scaleY': 1
      }
    },
    {
      'resizable': false,
      'increaseZIndex': true,
      'tag': 'div',
      'attribute': {},
      'style': {
        'font-size': '49px',
        'font-family': 'Bebas Neue',
        'text-align': 'center',
        'position': 'absolute',
        'user-select': 'none',
        'width': '158px',
        'letter-spacing': '10px',
        'transform': 'matrix(1.74,0,0,1.74,171,140.45) translate(0px, 41.0919540229885px)',
        'z-index': 23
      },
      'children': [
        {
          'resizable': true,
          'increaseZIndex': true,
          'tag': 'label',
          'attribute': {
            'class': 'users-editable-content'
          },
          'style': {
            'outline': 'none',
            'width': '100%'
          },
          'children': [],
          'innerText': 'HARRIS'
        }
      ],
      'type': 4,
      'dimention': {
        'width': 320,
        'height': 40,
        'rotate': 0,
        'translateX': 0,
        'translateY': 0,
        'scaleX': 1,
        'scaleY': 1
      }
    },
    {
      'resizable': true,
      'increaseZIndex': true,
      'tag': 'div',
      'attribute': {},
      'style': {
        'position': 'absolute',
        'cursor': 'move',
        'user-select': 'none',
        'width': '275px',
        'transform': 'matrix(1,0,0,1,112.6,240.5) translate(0px, 71.5px)',
        'z-index': 24
      },
      'children': [
        {
          'resizable': true,
          'increaseZIndex': true,
          'tag': 'hr',
          'attribute': {},
          'style': {
            'border-color': 'black',
            'border-top': '1px solid',
            'border-style': 'solid'
          },
          'children': []
        }
      ],
      'type': 8
    },
    {
      'resizable': false,
      'increaseZIndex': true,
      'tag': 'div',
      'attribute': {},
      'style': {
        'font-size': '24px',
        'font-family': 'Josefin Sans',
        'text-align': 'center',
        'position': 'absolute',
        'user-select': 'none',
        'width': '275px',
        'letter-spacing': '33px',
        'transform': 'matrix(1,0,0,1,112.6,304) translate(0px, 71.5px)',
        'z-index': 25
      },
      'children': [
        {
          'resizable': true,
          'increaseZIndex': true,
          'tag': 'label',
          'attribute': {
            'class': 'users-editable-content'
          },
          'style': {
            'outline': 'none',
            'width': '100%'
          },
          'children': [],
          'innerText': 'SUMMER\n'
        }
      ],
      'type': 4,
      'dimention': {
        'width': 320,
        'height': 40,
        'rotate': 0,
        'translateX': 0,
        'translateY': 0,
        'scaleX': 1,
        'scaleY': 1
      }
    }
  ];

  constructor(private fontService: FontFamilyService) {
    this.init();
  }

  init() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < 2; i++) {
      this.buildTextPickerItem(this.fontService.customTextFonts[i]);
    }

    this.buildImageTypeText();
  }

  buildImageTypeText() {
    const picker = getTextPickerInstance();
    picker.type = TextPickerTypes.IMAGE;
    picker.imageUrl = '/assets/images/pickers/calvin-harris.png';
    picker.canvasElement = new CanvasElement('div', {}, {
      position: 'absolute',
      width: '200px', height: '300px'
    }, this.tempp);
    this.list.push(picker);
  }

  buildTextPickerItem(item) {
    const picker = getTextPickerInstance();
    picker.fontSize = item.fontSize;
    picker.fontFamily = item.family;
    picker.type = TextPickerTypes.TEXT;
    picker.innerText = item.innerText; // Picker element text
    picker.canvasElement.children[0].innerText = 'Double click to edit'; // Canvas element text
    picker.canvasElement.style[CSS_PROPERTIES.FONT_SIZE] = item.fontSize;
    picker.canvasElement.style[CSS_PROPERTIES.FONT_FAMILY] = item.family;
    this.list.push(picker);

  }


}
