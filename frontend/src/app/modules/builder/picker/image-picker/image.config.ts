import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { CSS_CLASSES, IMAGE_ELEMENT_STYLES } from 'src/app/constants/css-constants';

export const IMAGE_TAG_DEFAULT_STYLE = {
  'width': '100%',
  'height': '100%',
  'object-fit': 'cover'
};

export const IMAGE_TAG_FOR_VECTOR_DEFAULT_STYLE = {
  'cursor': 'move',
  'max-width': '100%',
  'max-height': '100%'
};


export const IMAGE_TAG_DEFAULT_ATTRIBUTE = {
  'src': '',
  class: CSS_CLASSES.LG_PHOTO_WRAP,
  crossorigin: 'anonymous'
};

export function getImageElementInstance(): ImageCanvasElement {
  const imgStyle = CommonUtils.cloneDeep(IMAGE_TAG_DEFAULT_STYLE);
  const containerStyle = CommonUtils.cloneDeep(IMAGE_ELEMENT_STYLES);

  const child = new CanvasElement('div', {}, imgStyle, []);
  const canvasElement = new CanvasElement('div', {}, containerStyle, [child]);

  return new ImageCanvasElement(canvasElement);
}


export function getVectorElementInstance(): ImageCanvasElement {
  const attr = CommonUtils.cloneDeep(IMAGE_TAG_DEFAULT_ATTRIBUTE);
  const imgStyle = CommonUtils.cloneDeep(IMAGE_TAG_FOR_VECTOR_DEFAULT_STYLE);
  const containerStyle = CommonUtils.cloneDeep(IMAGE_ELEMENT_STYLES);

  const child = new CanvasElement('img', attr, imgStyle, []);
  const canvasElement = new CanvasElement('div', {}, containerStyle, [child]);

  return new ImageCanvasElement(canvasElement);
}
