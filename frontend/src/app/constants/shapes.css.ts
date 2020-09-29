import { CSS_PROPERTIES } from './css-constants';

const background = '#bdbdbd';

export const CSS_SHAPES = {
  square: {
    width: '100px',
    height: '100px',
    background
  },
  rectangle: {
    width: '200px',
    height: '100px',
    background
  },
  circle: {
    width: '100px',
    height: '100px',
    background,
    [CSS_PROPERTIES.BORDER_RADIUS]: '50%'
  },
  oval: {
    width: '200px',
    height: '100px',
    background,
    [CSS_PROPERTIES.BORDER_RADIUS]: '100px / 50px'
  },
  egg: {
    width: '126px',
    height: '180px',
    [CSS_PROPERTIES.BG_COLOR]: background,
    [CSS_PROPERTIES.BORDER_RADIUS]: '50% 50% 50% 50% / 60% 60% 40% 40%'
  },
  triangle: {
    width: '0',
    height: '0',
    'border-left': '50px solid transparent',
    'border-right': '50px solid transparent',
    'border-bottom': '100px solid ' + background
  },
  triangleTopLeft: {
    width: '0',
    height: '0',
    'border-top': '100px solid ' + background,
    'border-right': '100px solid transparent'
  },
  trapezoid: {
    'border-bottom': '100px solid ' + background,
    'border-left': '25px solid transparent',
    'border-right': '25px solid transparent',
    height: '0',
    width: '100px'
  },
  parallelogram: {
    width: '150px',
    height: '100px',
    transform: 'skew(20deg)',
    background
  }

};
