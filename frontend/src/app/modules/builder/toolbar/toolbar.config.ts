import { FILTER_TYPES, ELEMENT_TYPES } from '../../../constants/contants';
import { AVAILABLE_FONTS } from '../../../constants/font-family-list';
import { CSS_PROPERTIES } from '../../../constants/css-constants';

export enum AVA_TOOLBAR_OPTIONS {
  FONT_FAMILY,
  COLOR,
  BACKGROUND_COLOR,
  FONT_SIZE,
  OPACITY,
  LETTER_SPACING,
  FONT_WEIGHT_BOLD,
  FONT_STYLE_ITALIC,
  DELETE,
  RENAME_ME,
  TEXT_ALIGNMENT,
  LOCK,
  UNDO_REDO
}

const ATO = AVA_TOOLBAR_OPTIONS;
export const ELEMENT_TYPE_VS_TOOLBAR_OPT = {
  [ELEMENT_TYPES.BACKGROUND]: [ATO.BACKGROUND_COLOR],

  [ELEMENT_TYPES.PHOTO]: [ATO.OPACITY, ATO.DELETE, ATO.LOCK],

  [ELEMENT_TYPES.TEXT]: [ATO.FONT_FAMILY, ATO.COLOR, ATO.FONT_SIZE, ATO.OPACITY, ATO.LETTER_SPACING,
  ATO.FONT_WEIGHT_BOLD, ATO.FONT_STYLE_ITALIC, ATO.DELETE, ATO.TEXT_ALIGNMENT, ATO.LOCK],

  [ELEMENT_TYPES.VECTOR]: [ATO.OPACITY, ATO.DELETE, ATO.LOCK]
};

const AVAILABLE_FONT_SIZE = [];
for (let i = 5; i < 150; i++) {
  AVAILABLE_FONT_SIZE.push({ label: i + '', value: i + 'px' });
}

export const FilterConfig = [
  {
    id: AVA_TOOLBAR_OPTIONS.BACKGROUND_COLOR,
    cssField: CSS_PROPERTIES.BG_COLOR
  },
  {
    id: AVA_TOOLBAR_OPTIONS.COLOR,
    cssField: CSS_PROPERTIES.COLOR
  },
  {
    id: AVA_TOOLBAR_OPTIONS.FONT_FAMILY,
    filterType: FILTER_TYPES.SINGLE_SELECT,
    field: 'fontFamily',
    inputType: 'text',
    changeFontFamily: true,
    selectedValue: '',
    cssField: 'font-family',
    isSearchEnabled: true,
    options: AVAILABLE_FONTS,
    placeholder: 'Select Font Family'
  },
  {
    id: AVA_TOOLBAR_OPTIONS.FONT_SIZE,
    filterType: FILTER_TYPES.SINGLE_SELECT,
    field: 'fontSize',
    inputType: 'number',
    changeFontFamily: false,
    isSearchEnabled: false,
    selectedValue: '',
    cssField: 'font-size',
    options: AVAILABLE_FONT_SIZE,
    placeholder: 'Select Font Size'
  },
  {
    id: AVA_TOOLBAR_OPTIONS.FONT_WEIGHT_BOLD,
    filterType: FILTER_TYPES.TOGGABLE,
    field: 'fontWeight',
    selectedValue: '',
    isSelected: false,
    cssField: 'font-weight',
    cssValue: 'bold',
  },
  {
    id: AVA_TOOLBAR_OPTIONS.FONT_STYLE_ITALIC,
    filterType: FILTER_TYPES.TOGGABLE,
    field: 'fontStyle',
    selectedValue: '',
    isSelected: false,
    cssField: 'font-style',
    cssValue: 'italic',
  },
  {
    id: AVA_TOOLBAR_OPTIONS.TEXT_ALIGNMENT,
    filterType: FILTER_TYPES.TOGGABLE,
    field: 'textAlignment',
    selectedValue: '',
    isSelected: false,
    cssField: 'text-align'
  },
  {
    id: AVA_TOOLBAR_OPTIONS.LOCK,
    filterType: FILTER_TYPES.TOGGABLE,
    field: 'isLocked',
    isSelected: false
  },
  {
    id: AVA_TOOLBAR_OPTIONS.OPACITY,
    filterType: FILTER_TYPES.TOGGABLE,
    cssField: 'opacity'
  },
  {
    id: AVA_TOOLBAR_OPTIONS.DELETE,
  },
  {
    id: AVA_TOOLBAR_OPTIONS.UNDO_REDO,
  }
];
