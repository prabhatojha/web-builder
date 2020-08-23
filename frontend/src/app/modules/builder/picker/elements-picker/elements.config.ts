import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';

export const IMAGE_CONTAINER_DEFAULT_STYLE = {
  'position': 'absolute',
  'cursor': 'move',
  'user-select': 'none',
  'width': '200px'
};

export const HR_TAG_DEFAULT_STYLE = {
  'border-color': 'black'
};

const LINE_STYLES = [
  { style: 'solid', image: '/assets/images/pickers/solid-line.png', border: '1px' },
  { style: 'dotted', image: '/assets/images/pickers/dotted-line.png', border: '1px' },
  { style: 'dashed', image: '/assets/images/pickers/dashed-line.png', border: '1px' },
  { style: 'double', image: '/assets/images/pickers/double-line.png', border: '4px' }
];

export function getLineItems() {

  const hrStyle = CommonUtils.cloneDeep(HR_TAG_DEFAULT_STYLE);
  const containerStyle = CommonUtils.cloneDeep(IMAGE_CONTAINER_DEFAULT_STYLE);

  const child = new CanvasElement('hr', {}, hrStyle, []);
  const canvasElement = new CanvasElement('div', {}, containerStyle, [child]);
  canvasElement.type = ELEMENT_TYPES.LINE;

  return LINE_STYLES.map(line => {
    const can = CommonUtils.cloneDeep(canvasElement);
    can.children[0].style['border-top'] = `${line.border} solid`;
    can.children[0].style['border-style'] = line.style;
    return {
      imageUrl: line.image,
      backgroundSize: 'fixed',
      canvasElement: can
    };
  });
}

export function getBoxeItems() {

  const hrStyle = CommonUtils.cloneDeep(HR_TAG_DEFAULT_STYLE);
  const containerStyle = CommonUtils.cloneDeep(IMAGE_CONTAINER_DEFAULT_STYLE);

  const child = new CanvasElement('hr', {}, hrStyle, []);
  const canvasElement = new CanvasElement('div', {}, containerStyle, [child]);
  canvasElement.type = ELEMENT_TYPES.LINE;

  return LINE_STYLES.map(line => {
    const can = CommonUtils.cloneDeep(canvasElement);
    can.children[0].style['border-top'] = `${line.border} solid`;
    can.children[0].style['border-style'] = line.style;
    return {
      imageUrl: line.image,
      backgroundSize: 'fixed',
      canvasElement: can
    };
  });
}
