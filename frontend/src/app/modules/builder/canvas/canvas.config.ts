import { ELEMENT_TYPES } from 'src/app/constants/contants';

export const ELE_VS_RESIZE_HANDLES = {
  [ELEMENT_TYPES.TEXT]: ['e', 'w', 'n', 's'],
  [ELEMENT_TYPES.PHOTO]: ['e', 'w', 'n', 's', 'sw', 'se', 'ne', 'nw']
};


export const CANVAS_PROJECT = {
  elementId: 'my-first-element',
  id: 'jfaslj12o4u12oi',
  currentZindex: 1,
  canvasElement: {
    type: ELEMENT_TYPES.BACKGROUND,
    tag: 'div',
    locked: false,
    innerText: '',
    resizable: false,
    increaseZIndex: false,
    ratio: {
      x: '0',
      y: '0'
    },
    dimention: {
      width: 500,
      height: 500,
      rotate: 0,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1
    },
    style: {
      width: '500px',
      height: '500px',
      position: 'relative',
      'background-color': 'white',
      '-webkit-print-color-adjust': 'exact',
      overflow: 'hidden'
    },
    attribute: {
      class: 'canvas-template'
    },
    children: []
  }
}
