import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { CSS_SHAPES } from 'src/app/constants/shapes.css';

export const IMAGE_CONTAINER_DEFAULT_STYLE = {
  'position': 'absolute',
  'user-select': 'none',
  'width': '200px'
};

export const HR_TAG_DEFAULT_STYLE = {
  'border-color': 'black'
};

const LINE_STYLES = [
  { style: 'solid', image: '/assets/images/pickers/solid-line.png', border: '1px' },
  // { style: 'dotted', image: '/assets/images/pickers/dotted-line.png', border: '1px' },
  // { style: 'dashed', image: '/assets/images/pickers/dashed-line.png', border: '1px' },
  // { style: 'double', image: '/assets/images/pickers/double-line.png', border: '4px' }
];

export function getLineItems() {

  const containerStyle = CommonUtils.cloneDeep(IMAGE_CONTAINER_DEFAULT_STYLE);

  const hrStyle = CommonUtils.cloneDeep(HR_TAG_DEFAULT_STYLE);
  const child = new CanvasElement('hr', {}, hrStyle, []);
  const canvasElement = new CanvasElement('div', {}, containerStyle, [child]);
  canvasElement.type = ELEMENT_TYPES.LINE;

  return LINE_STYLES.map(line => {
    const can = CommonUtils.cloneDeep(canvasElement);
    can.children[0].style['border-top'] = `${line.border} ${line.style}`;
    return {
      imageUrl: line.image,
      backgroundSize: 'fixed',
      canvasElement: can
    };
  });
}

const SHAPES_STYLES = [
  { style: CSS_SHAPES.square, image: '/assets/images/pickers/square.png' },
  { style: CSS_SHAPES.rectangle, image: '/assets/images/pickers/rectangle.png' },
  { style: CSS_SHAPES.circle, image: '/assets/images/pickers/circle.png' },
  { style: CSS_SHAPES.oval, image: '/assets/images/pickers/oval.png' },
  { style: CSS_SHAPES.egg, image: '/assets/images/pickers/egg.png' },
  { style: CSS_SHAPES.triangle, image: '/assets/images/pickers/triangle.png' },
  { style: CSS_SHAPES.triangleTopLeft, image: '/assets/images/pickers/triangleTopLeft.png' },
  { style: CSS_SHAPES.trapezoid, image: '/assets/images/pickers/trapezoid.png' },
  { style: CSS_SHAPES.parallelogram, image: '/assets/images/pickers/parallelogram.png' },
];

export function getShapeItems() {

  const containerStyle = { 'position': 'absolute' };
  const canvasElement = new CanvasElement('div', {}, containerStyle, []);
  canvasElement.type = ELEMENT_TYPES.BOX;

  return SHAPES_STYLES.map(shape => {
    const can: CanvasElement = CommonUtils.cloneDeep(canvasElement);
    can.children[0] = new CanvasElement('div', {}, shape.style, []);

    return {
      imageUrl: shape.image,
      backgroundSize: 'fixed',
      canvasElement: can
    };
  });
}
