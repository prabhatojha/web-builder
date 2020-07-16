import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { TextPickerModel } from 'src/app/models/text.picker.model';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import { ElementDimentionModel } from 'src/app/constants/css-constants';

export const TEXT_TOOLBAR_OPTIONS = [0, 1, 3, 4, 6, 7, 8, 10, 11];
export const TEXT_CONTAINER_DEFAULT_STYLE = {
  'font-size': '24px',
  'font-family': 'monospace',
  'text-align': 'center',
  'position': 'absolute',
  'cursor': 'move',
  'user-select': 'none',
  'width': '320px',
  'word-break': 'break-all'
};

export const TEXT_TAG_DEFAULT_STYLE = {
  cursor: 'move',
  outline: 'none'
};

export const TEXT_TAG_DEFAULT_ATTRIBUTE = {};

export function getTextPickerInstance(): TextPickerModel {
  const attr = CommonUtils.cloneDeep(TEXT_TAG_DEFAULT_ATTRIBUTE);
  const imgStyle = CommonUtils.cloneDeep(TEXT_TAG_DEFAULT_STYLE);
  const containerStyle = CommonUtils.cloneDeep(TEXT_CONTAINER_DEFAULT_STYLE);

  const child = new CanvasElement('label', attr, imgStyle, []);
  const canvasElement = new CanvasElement('div', {}, containerStyle, [child]);
  canvasElement.type = ELEMENT_TYPES.TEXT;
  canvasElement.resizable = false;
  canvasElement.dimention = getDimention();

  return new TextPickerModel(TEXT_TOOLBAR_OPTIONS, canvasElement);
}

function getDimention() {
  const d = new ElementDimentionModel();
  d.width = 320;
  d.height = 40;

  return d;
}

export const TEXT_PICKER_CONST = {

};


// const vsss = {
//   tag: 'label',
//   id: 'xzkljasf214assaf',
//   type: 'image',
//   toolbarOptions: [0, 1, 3, 4, 6, 7, 8, 10, 11],
//   searchKeywords: [],
//   canvasElement: {
//     tag: 'div',
//     type: 'text',
//     attribute: {
//     },
//     style: {},
//     children: [
//       {
//         tag: 'label',
//         innerText: 'Double click to type',
//         style: {
//           cursor: 'move'
//         }
//       }
//     ]
//   },
//   imageUrl: '/assets/images/pickers/add-text.png'
// }
