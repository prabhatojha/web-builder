import { ELEMENT_TYPES } from 'src/app/constants/contants';

export const ELE_VS_RESIZE_HANDLES = {
  [ELEMENT_TYPES.TEXT]: ['e', 'w'],
  [ELEMENT_TYPES.PHOTO]: ['e', 'w', 'n', 's', 'sw', 'se', 'ne', 'nw'],
  [ELEMENT_TYPES.GROUP]: ['sw', 'se', 'ne', 'nw'],
  [ELEMENT_TYPES.MULTIPLE_SELECTION]: ['sw', 'se', 'ne', 'nw'],
  [ELEMENT_TYPES.LINE]: ['e', 'w']
};

export const ELE_VS_KEEP_RATIO = {
  [ELEMENT_TYPES.TEXT]: false,
  [ELEMENT_TYPES.PHOTO]: false,
  [ELEMENT_TYPES.GROUP]: true,
  [ELEMENT_TYPES.MULTIPLE_SELECTION]: true
};

// Weather element should scale or just resize the width
export const ELE_VS_RESIZABLE = {
  [ELEMENT_TYPES.TEXT]: true,
  [ELEMENT_TYPES.PHOTO]: true,
  [ELEMENT_TYPES.GROUP]: false,
  [ELEMENT_TYPES.MULTIPLE_SELECTION]: false,
  [ELEMENT_TYPES.LINE]: true
};


export const CANVAS_PROJECT = {
  elementId: 'my-first-element',
  id: 'jfaslj12o4u12oi',
  currentZindex: 1,
  zIndex: {
    [ELEMENT_TYPES.PHOTO]: 500,
    [ELEMENT_TYPES.ANY]: 5000
  },
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
};
