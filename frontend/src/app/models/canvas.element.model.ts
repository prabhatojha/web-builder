import { ELEMENT_TYPES } from '../constants/contants';

export class CanvasElement {
  type: ELEMENT_TYPES;
  width: number;
  height: number;
  ratio: {
    x: string,
    y: string
  };
  tag: string;
  attribute: {
    [attr: string]: string | string[]
  };
  style: {
    [attr: string]: string | string[]
  };
  children: Array<CanvasElement>;

  constructor(tag, attribute, style, children) {
    this.tag = tag;
    this.attribute = attribute;
    this.style = style;
    this.children = children;
  }
}
