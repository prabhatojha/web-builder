import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { TextPickerModel } from 'src/app/models/text.picker.model';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import {
  ElementDimentionModel, CSS_CLASSES, CSS_PROPERTIES, CSS_PROPERTY_VALUES, TEXT_ELEMENT_STYLES
} from 'src/app/constants/css-constants';

export const TEXT_TOOLBAR_OPTIONS = [0, 1, 3, 4, 6, 7, 8, 10, 11];

export const TEXT_TAG_DEFAULT_STYLE = {
  outline: 'none',
  [CSS_PROPERTIES.WIDTH]: '100%'
};

export const TEXT_TAG_DEFAULT_ATTRIBUTE = {
  class: CSS_CLASSES.EDITABLE_CONTENT
};

export function getTextPickerInstance(): TextPickerModel {
  const attr = CommonUtils.cloneDeep(TEXT_TAG_DEFAULT_ATTRIBUTE);
  const imgStyle = CommonUtils.cloneDeep(TEXT_TAG_DEFAULT_STYLE);
  const containerStyle = CommonUtils.cloneDeep(TEXT_ELEMENT_STYLES);

  const child = new CanvasElement('label', attr, imgStyle, []);
  const canvasElement = new CanvasElement('div', {}, containerStyle, [child]);
  canvasElement.type = ELEMENT_TYPES.TEXT;

  return new TextPickerModel(TEXT_TOOLBAR_OPTIONS, canvasElement);
}

export const TEXT_PICKER_CONST = {

};
