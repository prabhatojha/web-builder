
export class ElementDimentionModel {
  width = 0;
  height = 0;
  rotate = 0;
  translateX = 0;
  translateY = 0;
  scaleX = 1;
  scaleY = 1;
}

export const CSS_PROPERTIES = {
  Z_INDEX: 'z-index',
  COLOR: 'color',
  BG_COLOR: 'background-color',
  OVERFLOW: 'overflow',
  OVERFLOW_HIDDEN: 'hidden',
  FONT_FAMILY: 'font-family',
  FONT_ITALIC: 'font-style',
  FONT_SIZE: 'font-size',
  FONT_WEIGHT: 'font-weight',
  WIDTH: 'width',
  HEIGHT: 'height',
  TRANSFORM: 'transform',
  ROTATE: 'rotate',
  TRANSLATE_X: 'translateX',
  TRANSLATE_Y: 'translateY',
  SCALE_X: 'scaleX',
  SCALE_Y: 'scaleY',
  TOP: 'top',
  LEFT: 'left',
  TEXT_ALIGN: 'text-align',
  OPACITY: 'opacity',
};

export const ATTR_PROPERTIES = {
  CONTENT_EDITABLE: 'contentEditable',
  ID: 'id'
};

export const CSS_ELEMENT_PROPS = {
  offsetLeft: 'offsetLeft',
  offsetTop: 'offsetTop'
};

export const CSS_PROPERTY_VALUES = {
  OVERFLOW_HIDDEN: 'hidden',
  FONT_WEIGHT_BOLD: 'bold',
  FONT_WEIGHT_NORMAL: 'normal',
  FONT_ITALIC: 'italic',
  FONT_STYLE_NORMAL: 'normal'
};

export const PX_APPLICABLE_CSS_PROPS = [
  CSS_PROPERTIES.WIDTH,
  CSS_PROPERTIES.HEIGHT,
  CSS_PROPERTIES.TOP,
  CSS_PROPERTIES.FONT_SIZE,
  CSS_PROPERTIES.LEFT,
];
