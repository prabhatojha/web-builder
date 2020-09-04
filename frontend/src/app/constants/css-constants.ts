
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
  BG: 'background',
  BG_COLOR: 'background-color',
  BG_IMAGE: 'background-image',
  LETTER_SPACING: 'letter-spacing',
  LINE_HEIGHT: 'line-height',
  BG_SIZE: 'background-size',
  BG_POSITION: 'background-position',
  OVERFLOW: 'overflow',
  OVERFLOW_HIDDEN: 'hidden',
  FONT_FAMILY: 'font-family',
  FONT_ITALIC: 'font-style',
  FONT_SIZE: 'font-size',
  FONT_WEIGHT: 'font-weight',
  WIDTH: 'width',
  HEIGHT: 'height',
  TRANSFORM: 'transform',
  TRANSLATE: 'translate',
  ROTATE: 'rotate',
  TRANSLATE_X: 'translateX',
  TRANSLATE_Y: 'translateY',
  SCALE_X: 'scaleX',
  SCALE_Y: 'scaleY',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TEXT_ALIGN: 'text-align',
  OPACITY: 'opacity',
  POSITION: 'position',
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
  FONT_STYLE_NORMAL: 'normal',
  BG_SIZE_COVER: 'cover',
  GB_POSITION_CENTER: 'center',
  TEXT_ALIGN_LEFT: 'left',
  TEXT_ALIGN_CENTER: 'center',
  TEXT_ALIGN_JUSTIFY: 'justify',
  TEXT_ALIGN_RIGHT: 'right',
  COLOR_TRANSPARENT: 'transparent',
  COLOR_BLACK: 'black',
  POSITION_ABSOLUTE: 'absolute',
  NONE: 'none'
};

export const PX_APPLICABLE_CSS_PROPS = [
  CSS_PROPERTIES.WIDTH,
  CSS_PROPERTIES.HEIGHT,
  CSS_PROPERTIES.TOP,
  CSS_PROPERTIES.FONT_SIZE,
  CSS_PROPERTIES.LEFT,
  CSS_PROPERTIES.LETTER_SPACING
];

export const CSS_CLASSES = {
  LG_PHOTO_WRAP: 'large-photo-wrapper',
  MOVEABLE_AREA: 'moveable-area',
  MOVEABLE_CONTOLL_BOX: 'moveable-control-box',
  MOVEABLE_CONTROL: 'moveable-control',
  MOVEABLE_LINE: 'moveable-line',
  EDITABLE_CONTENT: 'users-editable-content',
  SELECTABLE_ITEM_GUID: 'selected-item-guide'
};

const COMMON_ELEMENT_STYLES = {
  [CSS_PROPERTIES.OPACITY]: 1,
  [CSS_PROPERTIES.POSITION]: CSS_PROPERTY_VALUES.POSITION_ABSOLUTE,
  [CSS_PROPERTIES.BG]: CSS_PROPERTY_VALUES.COLOR_TRANSPARENT,
  [CSS_PROPERTIES.TRANSFORM]: 'none',
  'user-select': 'none',
};

export const TEXT_ELEMENT_STYLES = Object.assign({}, COMMON_ELEMENT_STYLES, {
  [CSS_PROPERTIES.FONT_SIZE]: '35px',
  [CSS_PROPERTIES.FONT_FAMILY]: 'monospace',
  [CSS_PROPERTIES.TEXT_ALIGN]: 'center',
  [CSS_PROPERTIES.WIDTH]: '320px',
  [CSS_PROPERTIES.LETTER_SPACING]: '0px',
  [CSS_PROPERTIES.LINE_HEIGHT]: 1.5,
  [CSS_PROPERTIES.FONT_ITALIC]: CSS_PROPERTY_VALUES.FONT_STYLE_NORMAL,
  [CSS_PROPERTIES.FONT_WEIGHT]: CSS_PROPERTY_VALUES.FONT_WEIGHT_NORMAL,
  [CSS_PROPERTIES.COLOR]: CSS_PROPERTY_VALUES.COLOR_BLACK
});

export const IMAGE_ELEMENT_STYLES = Object.assign({}, COMMON_ELEMENT_STYLES, {
  [CSS_PROPERTIES.TEXT_ALIGN]: [CSS_PROPERTY_VALUES.TEXT_ALIGN_CENTER],
  [CSS_PROPERTIES.WIDTH]: '200px',
  [CSS_PROPERTIES.HEIGHT]: '200px'
});
