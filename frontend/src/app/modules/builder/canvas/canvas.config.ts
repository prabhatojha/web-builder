import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CommonUtils } from 'src/app/utils/common.utils';

export const IMAGE_TOOLBAR_OPTIONS = [8, 4, 11];
export const IMAGE_CONTAINER_DEFAULT_STYLE = {
  'text-align': 'center',
  'position': 'absolute',
  'cursor': 'move',
  'user-select': 'none',
  'width': '279px',
  'height': '185px'
};

export const IMAGE_TAG_DEFAULT_STYLE = {
  'cursor': 'move',
  'width': '100%',
  'height': '100%',
  'object-fit': 'cover'
};

export const IMAGE_TAG_DEFAULT_ATTRIBUTE = {
  'src': ''
};

export function getImageElementInstance(): ImageCanvasElement {
  const attr = CommonUtils.cloneDeep(IMAGE_TAG_DEFAULT_ATTRIBUTE);
  const imgStyle = CommonUtils.cloneDeep(IMAGE_TAG_DEFAULT_STYLE);
  const containerStyle = CommonUtils.cloneDeep(IMAGE_CONTAINER_DEFAULT_STYLE);

  const child = new CanvasElement('img', attr, imgStyle, []);
  const canvasElement = new CanvasElement('div', {}, containerStyle, [child]);

  return new ImageCanvasElement(IMAGE_TOOLBAR_OPTIONS, canvasElement);
}

export const DEFAULT_TEXT_CSS = {

};
