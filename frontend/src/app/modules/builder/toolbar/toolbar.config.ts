import { FILTER_TYPES } from '../../../constants/contants';
import { AVAILABLE_FONTS } from '../../../constants/font-family-list';
import {CSS_PROPERTIES} from '../../../constants/css-constants';

export const AVA_TOOLBAR_OPTIONS = {
  FONT_FAMILY: 0,
  COLOR: 1,
  BACKGROUND_COLOR: 2,
  FONT_SIZE: 3,
  OPACITY: 4,
  LETTER_SPACING: 5,
  FONT_WEIGHT_BOLD: 6,
  FONT_STYLE_ITALIC: 7,
  DELETE: 8,
  TEXT_ALIGNMENT: 10,
};

// const AVAILABLE_FONT_SIZE = [];

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
    id: AVA_TOOLBAR_OPTIONS.DELETE,
  }
];
