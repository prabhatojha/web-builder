import { ELEMENT_TYPES } from '../constants/contants';
import { ElementDimentionModel } from '../constants/css-constants';

export class CanvasElement {
  type: ELEMENT_TYPES;
  // width: number;
  // height: number;
  dimention: ElementDimentionModel;
  ratio: {
    x: string,
    y: string
  };
  tag: string;
  attribute: {
    [attr: string]: string
  };
  style: {
    [style: string]: string
  };
  innerText: string;
  children: Array<CanvasElement>;
  locked: boolean;
  resizable = true;
  increaseZIndex = true;

  constructor(tag, attribute, style, children) {
    this.tag = tag;
    this.attribute = attribute;
    this.style = style;
    this.children = children;
  }
}
