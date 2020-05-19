import { FILTER_TYPES } from '../../../constants/contants';
import { AVAILABLE_FONTS } from '../../../constants/font-family-list';

export const AVA_TOOLBAR_OPTIONS = {
  FONT_FAMILY: 0,
  COLOR: 1,
  BACKGROUND: 2,
  FONT_SIZE: 3,
  OPACITY: 4,
  LETTER_SPACING: 5,
  BOLD: 6,
  ITALIC: 7
}




export const FilterConfig = [
  {
    id: AVA_TOOLBAR_OPTIONS.FONT_FAMILY,
    filterType: FILTER_TYPES.SINGLE_SELECT,
    field: 'fontFamily',
    inputType: 'text',
    changeFontFamily: true,
    selectedValue: '',
    updateCss: 'font-family',
    options: AVAILABLE_FONTS
  },
  {
    id: AVA_TOOLBAR_OPTIONS.FONT_SIZE,
    filterType: FILTER_TYPES.SINGLE_SELECT,
    field: 'fontSize',
    inputType: 'number',
    options: []
  }
];
