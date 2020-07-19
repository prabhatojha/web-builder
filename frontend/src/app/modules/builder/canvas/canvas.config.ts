import { ELEMENT_TYPES } from 'src/app/constants/contants';

export const ELE_VS_RESIZE_HANDLES = {
  [ELEMENT_TYPES.TEXT]: ['e', 'w', 'n', 's'],
  [ELEMENT_TYPES.PHOTO]: ['e', 'w', 'n', 's', 'sw', 'se', 'ne', 'nw']
};
